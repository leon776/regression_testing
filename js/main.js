
/*
 * grunt-ttf2base64-and-otherfonts
 * https://github.com/leon776/grunt-ttf2base64-and-otherfonts
 *
 * Copyright (c) 2015 xiaoweili
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path'),
    fs = require('fs'),
    md5 = require('md5'),
    gui = require('nw.gui'),
    moment = require('moment'),
    template = require('art-template'),
    CleanCSS = require('clean-css'),
    msgTepl, render, msgTeplCss, renderCss;
    //shell = gui.Shell;
    global.$ = $;
    global.data = {};
    global.cssData = {};
var CssOperater = (function() {
    var Operater = function() {};
    Operater.prototype.getStyleJson = function (nodes) {
        var tmp = {};
        for(var i = 0; i < nodes.length; i++) {
            tmp[md5(i + nodes[i].tagName)] = this.getStyle(nodes[i]);
        }
        return tmp;
    };
    Operater.prototype.getStyle = function (obj) {
        var cupStyle = getComputedStyle(obj);
        var tmp = {};
        for(var name in cupStyle) {
            if(!isNaN(parseInt(name))) {
                continue;
            }
            if( cupStyle[name] && typeof(cupStyle[name]) === 'string' && name !== 'cssText' ) {
                tmp[name] = cupStyle[name];
            }
        }
        return tmp;
    };
    Operater.prototype.delUselsessSelecter = function (str, selecter) {
        var _selecter, regComma, regStyle, length = selecter.length;
        for (var i = 0; i < length; i++) {
            _selecter = selecter[i].replace('(', '\\(').replace(')', '\\)')
                .replace('^', '\\^')
                .replace(']', '\\]')
                .replace('[', '\\[');
            regComma  = new RegExp('([,\\t\\n\\s\\/]+)' + _selecter + '\\s*,', "g");
            regStyle  = new RegExp('(}[\\t\\n\\s\\/]*)' + _selecter + '\\s*{([^}]*)}', "g");
            str       = str.replace(regComma, '$1').replace(regStyle, '$1');
        };
        return str;
    };
    //获取所有的css选择器
    Operater.prototype.getSelecter = function (str) {
        var minified = "}" + new CleanCSS().minify(str).styles,
            selecter = [],
            reg = new RegExp("}([^{}%@]*){","g"),
            mediaFilter = new RegExp(/@media[^{}]*{/g);

        minified = minified.replace(mediaFilter, "$&}");
        var tmparray = minified.match(reg);
        for (var i = 0; i < tmparray.length; i++) {
            var tmpStr = tmparray[i].replace('}','').replace('{','');
            selecter.push(tmpStr);
        }
        return selecter.join(',').split(',');
    };
    Operater.prototype.contrastPage = function (nodes, testData, pageName) {
        var flag = false, msg = [], str = '', pid = md5(pageName);
        for(var i = 0; i < nodes.length; i++) {
            var node = this.getStyle(nodes[i]),
                testDataTmp = testData[md5(i + nodes[i].tagName)];
            //console.log(testDataTmp)
            if(!testDataTmp) {
                //console.log(nodes[i] + pageName)
            }
            else if( JSON.stringify(node) !== JSON.stringify(testDataTmp) ) {
                if(!flag) {
                    str += "网页"+ pageName + "有变化\n";
                }
                flag = flag ? flag : true;
                str += "\n元素" + nodes[i].outerHTML + '发生了改变\n';
                for (var j in testDataTmp) {
                    if(!(testDataTmp[j] === node[j])) {
                        str += j + '的值由：' + testDataTmp[j] + '变为了：' + node[j] + '\n';
                    }
                }
            }
        }
        if(!flag) {
            //console.log("网页"+ pageName + "没有变化");
            msg.push({
                "txt": "网页"+ pageName + "没有变化",
                "type": 0
            });
        } else {
            msg.push({
                "txt": "网页"+ pageName + "有变化",
                "type": 1,
                "id": pid
            });
        }
        global.data[pid] = {"data" : str};
        $('#outPutMsg').append(render({"msg" : msg}));
    };
    return Operater;
})();
//工具函数
Array.prototype.unique = function()
{
    this.sort();
    var re=[this[0]];
    for(var i = 1; i < this.length; i++)
    {
        if( this[i] !== re[re.length-1])
        {
            re.push(this[i]);
        }
    }
    return re;
};
var preventDefault = function() {
    $(document).on({
        dragleave:function(e){    //拖离
            e.preventDefault();
        },
        drop:function(e){  //拖后放
            e.preventDefault();
        },
        dragenter:function(e){    //拖进
            e.preventDefault();
        },
        dragover:function(e){    //拖来拖去
            e.preventDefault();
        }
    });
},
domDragOn = function(obj) {
    $(obj).addClass('on');
    $(obj).children('.label-area').hide();
    $(obj).children('p').show();
},
domDragEnd = function(obj) {
    $(obj).removeClass('on');
    $(obj).children('p').hide();
    $(obj).children('.label-area').show();
},
scanFolder = function (fpath){
    var fileList = [],
        folderList = [],
        files,
        walk = function(fpath, fileList, folderList){
            files = fs.readdirSync(fpath);
            files.forEach(function(item) {
                var tmpPath = path.join(fpath, item),
                    stats = fs.statSync(tmpPath);

                if (stats.isDirectory()) {
                    walk(tmpPath, fileList, folderList);
                    folderList.push(tmpPath);
                } else {
                    fileList.push(tmpPath);
                }
            });
        };

    walk(fpath, fileList, folderList);
    console.log('扫描' + fpath +'成功');
    return fileList;
},
deleteFolderRecursive = function(fpath) {
    var files = [];
    if( fs.existsSync(fpath) ) {
        files = fs.readdirSync(fpath);
        files.forEach(function(file, index){
            var curPath = path.join(fpath, file);
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(fpath);
    }
},
showLog = function(id) {
    var win = gui.Window.open('log.html', {
        position: 'center',
        width: 800,
        height: 600
    });
    win.on('document-end', function () {
        win.window.document.getElementById('log').value = global.data[id].data;
    });
},
showLogCss = function(id) {
    var win = gui.Window.open('log.html', {
        position: 'center',
        width: 800,
        height: 600
    }), str = '';
    win.on('document-end', function () {
        var _data = global.cssData[id].unique();
        for(var i = 0; i < _data.length; i++) {
            str += 'html文件路径：' + _data[i].path + '\n\n';
            str += 'dom节点：' + _data[i].html + '\n';
        }
        win.window.document.getElementById('log').value = str;
    });
},
fileMapping = function (fpath){
    var tmp = [];
    var files = fs.readdirSync(fpath);
    files.forEach(function(file){
        var tempPath = path.join(fpath, file);
        var stats = fs.statSync(tempPath);
        if(stats.isDirectory()){
            tmp.push(path.basename(tempPath));
        }
    });
    return tmp;
};


var App = (function() {
    var App = function(option) {
        this.option = option;
        this.htmlfile = [];
        this.curPage = 0;
        this.processBar = $('#progress .bar');
        this.frame = $('#iframe')[0];
        this.cssPath = '';
        this.useFulCss = [],
        this.useLessCss = [];
    };
    App.prototype = new CssOperater();
    App.prototype.bindEvent = function() {
        var self = this;
        //拖拽上传
        this.dragBox.bind('dragenter', function(e) {
            domDragOn(this);
        });
        this.dragBox.bind('dragleave', function(e) {
            domDragEnd(this);
        });
        $('#createVersion').click(function() {
            self.createTestJson();
        });
        $('#delVersion').click(function() {
            self.delTestVer();
        });
        $('#startTest').click(function() {
            self.startTest();
        });
        $('#uploadCss').change(function() {
            self.cssPath = this.value;
            self.getUselessCss(this.value);
        });
        $('#startCssTest').click(function() {
            if(self.cssPath) {
                self.getUselessCss(self.cssPath);
            } else {
                self.tip('清先上传css', 'error');
            }
        });
        $('#clearUselessCss').click(function() {
            if(self.cssPath) {
                self.clearUselessCss(self.cssPath);
            } else {
                self.tip('清先上传css', 'error');
            }
        });
        this.dragBox.bind('drop', function(e) {
            domDragEnd(this);
            var fileList = window.event.dataTransfer.files;
            if(fileList.length === 0){return false;}
            $('#dest').val(fileList[0].path);
            self.dest = fileList[0].path;
            if(!fs.existsSync(self.dest + '/.testdata/')) {
                fs.mkdirSync(self.dest + '/.testdata');
            }
            self.htmlfile = [];
            self.loadTestVer();
            self.readFolder(fileList[0].path);
        });
        $('#filePathDialog').change(function() {
            $('#dest').val(this.value);
            self.dest = this.value;
            if(!fs.existsSync(self.dest + '/.testdata/')) {
                fs.mkdirSync(self.dest + '/.testdata');
            }
            self.htmlfile = [];
            self.loadTestVer();
            self.readFolder(this.value);
        });
    };
    App.prototype.clearUselessCss = function(cssPath) {
        if(this.useLessCss.length <= 0) {
            this.tip('清先扫描css', 'error');
        }
        var cssText = this.delUselsessSelecter(fs.readFileSync(cssPath, 'utf-8'), this.useLessCss), 
            clearCss = path.dirname(cssPath) + '/' + path.basename(cssPath, '.css') + '.clear.css';
        fs.writeFileSync(clearCss, cssText, 'utf-8');
        this.tip('清理成功，文件'+ clearCss +'生成', 'alert-success');
    };
    App.prototype.getUselessCss = function(cssPath) {
        var self = this, hit = {}, useFulCss = {}, _useFulCssSelecter = [];
        self.cssSelecter = self.getSelecter(fs.readFileSync(cssPath, 'utf-8'));
        self.tip('css扫描中，请稍后', '');
        _scan();
        function _scan() {
            for(var i = self.curPage; i < self.htmlfile.length; i++) {
                self.frame.src = self.htmlfile[i].path;
                self.frame.onload = function() {
                    for (var j = 0; j < self.cssSelecter.length; j++) {
                        var _dom = this.contentWindow.document.querySelectorAll(self.cssSelecter[j].split(':')[0]),_l = _dom.length, _domHtml = '', _key = md5(self.cssSelecter[j]);
                        hit[_key] = hit[_key] ? hit[_key] + _l : _l;
                        if(_l > 0) {
                            useFulCss[_key] = useFulCss[_key] ? useFulCss[_key] : [];
                            for(var k = 0; k < _l; k++) {
                                _domHtml +=
                                '\n=====================================\n'
                                + _dom[k].outerHTML
                                + '\n===================================\n';
                            }
                            useFulCss[_key].push({
                                path: self.htmlfile[i].path,
                                html: _domHtml,
                                selecter: self.cssSelecter[j]
                            });
                            _useFulCssSelecter.push(self.cssSelecter[j]);
                            //break;
                        }
                    }
                    self.curPage++;
                    self._showProcess();
                    if(self.curPage == self.htmlfile.length) {
                        self.tip('css扫描完毕', 'alert-success');
                        self.curPage = 0;
                        _showRes();
                    } else {
                        if(self.cssSelecter.length > 0) {
                            _scan();
                        }
                    }
                };
                break;
            }
        }
        function _showRes() {
            var msg = [], type, useLessCss, _key;
            global.cssData = useFulCss;
            useLessCss = _cj(_useFulCssSelecter.unique(), self.cssSelecter);
            for (var i = 0; i < self.cssSelecter.length; i++) {
                _key = md5(self.cssSelecter[i]);
                type = hit[_key] === 0 ? 1 : 0;
                msg.push({
                    "id": _key,
                    "txt": "选择器: " + self.cssSelecter[i] + " 命中DOM节点" + hit[_key] + '次',
                    "type": type
                });
            }
            self.useFulCss = useFulCss;
            self.useLessCss = useLessCss;
            $('#outPutMsg').html('').append(renderCss({"msg" : msg}));
        }

        function _cj(a, b) { // 差集
            return $.merge($.grep(a, function(i) {
                    return $.inArray(i, b) == -1;
                }) , $.grep(b, function(i) {
                    return $.inArray(i, a) == -1;
                })
            );
        }
    };

    App.prototype.createTestJson = function() {
        if(this.htmlfile.length === 0) {
            this.tip('请先选择html目录', 'alert-error');
            return;
        }
        var self = this, ver = moment().format("MM月DD日hh时mm分ss秒");
        ver = self.dest + '/.testdata/' + ver;
        fs.mkdirSync(ver);
        self.tip('测试数据创建中，请稍后', '');
        _create();
        function _create() {
            for(var i = self.curPage; i < self.htmlfile.length; i++) {
                self.frame.src = self.htmlfile[i].path;
                self.frame.onload = function() {
                    var nodes = this.contentWindow.document.getElementsByTagName('*');
                    var json = JSON.stringify(self.getStyleJson(nodes));
                    fs.writeFile(ver + '/' + self.htmlfile[i].name + '.json', json, 'utf-8');
                    self.curPage++;
                    self._showProcess();
                    if(self.curPage == self.htmlfile.length) {
                        self.tip('版本生成成功', 'alert-success');
                        self.loadTestVer();
                        self.curPage = 0;
                    } else {
                        _create();
                    }
                };
                break;
            }
        }
    };
    App.prototype.startTest = function() {
        var self = this;
        var testDataPath = this.dest + '/.testdata' + '/' + $('#htmlVersion')[0].value,
            testData;
        this.clearMsg();
        self.tip('测试中，请稍后', '');
        _contrast();
        function _contrast() {
            for(var i = self.curPage; i < self.htmlfile.length; i++) {
                testData = JSON.parse(fs.readFileSync(testDataPath + '/' + self.htmlfile[i].name + '.json', 'utf8'));
                (function() {
                    var tmp = i;
                    self.frame.src = self.htmlfile[i].path;
                    self.frame.onload = function() {
                        var nodes = this.contentWindow.document.getElementsByTagName('*');
                        self.curPage++;
                        self.contrastPage(nodes, testData, self.htmlfile[tmp].path);
                        self._showProcess();
                        if(self.curPage == self.htmlfile.length) {
                            self.tip('测试完毕', 'alert-success');
                            self.curPage = 0;
                        } else {
                            _contrast();
                        }
                    };
                })();
                break;
            }
        }
    };
    App.prototype.loadTestVer = function() {
        var tmp = '';
        this.testData = fileMapping(this.dest + '/.testdata');
        this.testData.forEach(function(name) {
            tmp += '<option value="'+name+'">'+name+'</option>';
        });
        $('#htmlVersion').html(tmp);
    };
    App.prototype.delTestVer = function() {
        if(!$('#htmlVersion')[0].value) {
            this.tip('已经木有版本数据了', 'alert-error');
            return;
        }
        deleteFolderRecursive(this.dest + '/.testdata' + '/' + $('#htmlVersion')[0].value);
        this.tip('版本'+ $('#htmlVersion')[0].value +'删除成功', 'alert-success');
        this.loadTestVer();
    };

    App.prototype.clearMsg = function() {
        $('#outPutMsg').html('');
    };

    App.prototype._showProcess = function() {
        var pro = Math.round((this.curPage) * 100 / this.htmlfile.length);
        if(pro < 1 || pro > 99) {
            $('#progress').hide();
        } else {
            $('#progress').show();
        }
        this.processBar.css('width', pro + '%');
    };


    App.prototype.readFolder = function(fpath) {
        var files = scanFolder(fpath), msg = [];
        for(var name in files) {
            if(path.extname(files[name]) === '.html') {
                this.htmlfile.push({
                    "name" : path.basename(files[name]),
                    "path" : files[name]
                });
                msg.push({
                    "txt": '读取' + path.basename(files[name]) + '成功',
                    "type": 0
                });
            }
        }
        this.tip('html文件读取成功', 'alert-success');
        $('#outPutMsg').html(render({"msg" : msg}));
    };

    App.prototype.tip = function(txt, cls) {
        $('#alert').html(txt)[0].className = 'alert ' + cls;
    };

    App.prototype.init = function() {
        preventDefault();
        this.dragBox = $('#' + this.option.dragBox);
        this.dest = $('#dest').val();
        if(!fs.existsSync(this.dest + '/.testdata/')) {
            fs.mkdirSync(this.dest + '/.testdata');
        }
        msgTepl = $('#msgTepl')[0].innerText;
        msgTeplCss = $('#msgTeplCss')[0].innerText;
        render = template.compile(msgTepl);
        renderCss = template.compile(msgTeplCss);
        this.bindEvent();
        this.loadTestVer();
        this.readFolder(this.dest);
    };
    return App;
})();




$(document).ready(function() {
    var app = new App({
        dragBox : 'dragUpload'
    });
    app.init();
});
