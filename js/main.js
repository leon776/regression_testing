
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
    msgTepl, render;
    //shell = gui.Shell;
    global.$ = $;
    global.data = {};

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
}
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
//css处理类
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
    Operater.prototype.getSelecter = function (str) {
        var minified = new CleanCSS().minify(str).styles;
        var selecter = [], minified = "}" + minified,
            reg = new RegExp("}([^{}%@]*){","g"),
            mediaFilter = new RegExp(/@media[^{}]*{/g);
        minified = minified.replace(mediaFilter, "$&}");
        var tmparr = minified.match(reg);
        for (var i = 0; i < tmparr.length; i++) {
            var tmpStr = tmparr[i].replace('}','').replace('{','');
            selecter.push(tmpStr);
        };
        return selecter.join(',').split(',');
    };
    Operater.prototype.contrastPage = function (nodes, testData, pageName) {
        var flag = false, msg = [], str = '';
        console.log(testData.length)
        for(var i = 0; i < nodes.length; i++) {
            var node = this.getStyle(nodes[i]),
                testDataTmp = testData[md5(i + nodes[i].tagName)];
            if( JSON.stringify(node) !== JSON.stringify(testDataTmp) ) {
                if(!flag) {
                    //console.log("网页"+ pageName +"有变化");
                    str += "网页"+ pageName +"有变化\n";
                }
                flag = flag ? flag : true;
               //console.log("\n元素" + nodes[i].outerHTML + '发生了改变\n');
                str += "\n元素" + nodes[i].outerHTML + '发生了改变\n';
                for (var j in testDataTmp) {
                    if(!(testDataTmp[j] === node[j])) {
                        //console.log(j + '的值由：' + testDataTmp[j] + '变为了：' + node[j]);
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
                "id": pageName
            });
        }
        global.data[pageName] = {"data" : str};
        $('#outPutMsg').append(render({"msg" : msg}));
    };
    return Operater;
})();

var App = (function() {
    var App = function(option) {
        this.option = option;
        this.htmlfile = [];
        this.curPage = 0;
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
        this.dragBox.bind('drop', function(e) {
            domDragEnd(this);
            var fileList = window.event.dataTransfer.files; //获取文件对象
            //检测是否是拖拽文件到页面的操作
            if(fileList.length === 0){return false;}
            self.readFolder(fileList[0].path);
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
            self.getUselessCss(this.value);
        });

        $('#filePathDialog').change(function() {
            $('#dest').val(this.value);
            self.dest = this.value;
            if(!fs.existsSync(self.dest + '/.testdata/')) {
                fs.mkdir(self.dest + '/.testdata');
            }
            self.htmlfile = [];
            self.loadTestVer();
            self.readFolder(this.value);
        });
    };

    App.prototype.getUselessCss = function(cssPath) {
        var self = this, useFulCss = [];
        self.cssSelecter = self.getSelecter(fs.readFileSync(cssPath, 'utf-8'));
        _scan();
        function _scan() {
            for(var i = self.curPage; i < self.htmlfile.length; i++) {
                $('#iframe')[0].src = self.htmlfile[i].path;
                $('#iframe')[0].onload = function() {
                    for (var j = 0; j < self.cssSelecter.length; j++) {
                        if( $(this.contentWindow.document).find(self.cssSelecter[j].split(':')[0]).length > 0 ) {
                           useFulCss.push(self.cssSelecter[j]);
                        }
                    };
                    $('#progress .bar').css('width', Math.ceil(self.curPage * 100 / self.htmlfile.length) + '%');
                    self.curPage++;
                    if(self.curPage == self.htmlfile.length) {
                        $('#progress').hide();
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
            var msg = [], useLessCss = _cj(useFulCss.unique(), self.cssSelecter);
            for (var i = 0; i < useLessCss.length; i++) {
                msg.push({
                    "txt": "选择器: " + useLessCss[i] + " 没有命中任何DOM节点",
                    "type": 0
                });
            };
            $('#outPutMsg').html('').append(render({"msg" : msg}));
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
        fs.mkdir(ver);
        _create();
        $('#progress').show();
        function _create() {
            for(var i = self.curPage; i < self.htmlfile.length; i++) {
                $('#iframe')[0].src = self.htmlfile[i].path;
                $('#iframe')[0].onload = function() {
                    var nodes = this.contentWindow.document.getElementsByTagName('*');
                    var json = JSON.stringify(self.getStyleJson(nodes));
                    fs.writeFile(ver + '/' + self.htmlfile[i].name + '.json', json, 'utf-8');
                    $('#progress .bar').css('width', Math.ceil(self.curPage *100 / self.htmlfile.length) + '%');
                    self.curPage++;
                    if(self.curPage == self.htmlfile.length) {
                        $('#progress').hide();
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
        _contrast();
        function _contrast() {
            for(var i = self.curPage; i < self.htmlfile.length; i++) {
                testData = JSON.parse(fs.readFileSync(testDataPath + '/' + self.htmlfile[i].name + '.json', 'utf8'));
                (function() {
                    var tmp = i;
                    $('#iframe')[0].src = self.htmlfile[i].path;
                    $('#iframe')[0].onload = function() {
                        var nodes = this.contentWindow.document.getElementsByTagName('*');
                        self.curPage++;
                        self.contrastPage(nodes, testData, self.htmlfile[tmp].name);
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
        deleteFolderRecursive(this.dest + '/.testdata' + '/' + $('#htmlVersion')[0].value);
        this.loadTestVer();
    };
    App.prototype.clearMsg = function() {
        $('#outPutMsg').html('');
    };

    App.prototype.tip = function(txt, cls) {
        $('#alert').html(txt)[0].className = 'alert ' + cls;
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
        $('#outPutMsg').html(render({"msg" : msg}));
    };
    App.prototype.init = function() {
        preventDefault();
        this.dragBox = $('#' + this.option.dragBox);
        this.dest = $('#dest').val();
        if(!fs.existsSync(this.dest + '/.testdata/')) {
            fs.mkdir(this.dest + '/.testdata');
        }
        msgTepl = $('#msgTepl')[0].innerText;
        render = template.compile(msgTepl);
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
