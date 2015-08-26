
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
    msgTepl = $('#msgTepl')[0].innerText,
    msgTeplCss = $('#msgTeplCss')[0].innerText,
    msgTepload = $('#loadTepl')[0].innerText,
    render = template.compile(msgTepl),
    renderCss = template.compile(msgTeplCss),
    renderLoad = template.compile(msgTepload);
    //shell = gui.Shell;
    global.$ = $;
    global.data = {};
    global.cssData = {};


var CssOperater = require('./js/css_operater'),
    PhantomRender = require('./js/phantom_render'),
    FileOperater = require('./js/file_operater');
//debug
for(var module in global.require.cache){
    if(global.require.cache.hasOwnProperty(module)){
        delete global.require.cache[module];
    }
}
//debug

//工具函数
Array.prototype.unique = function(){
    if(this.length === 0) {
        return [];
    }
    this.sort();
    var re = [this[0]];
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
updateTestCase = function(src) {
    app.createTestJson(src, function() {
        app.readFolder($('#dest').val());
    });
},
showLog = function(id) {
    var win = gui.Window.open('log.html', {
        position: 'center',
        width: 800,
        height: 600,
        toolbar: false
    });
    win.on('document-end', function () {
        win.window.document.getElementById('log').value = global.data[id].data;
    });
},
showPic = function(name, dest) {
    var win = gui.Window.open('contrast_img.html', {
        position: 'center',
        width: 1280,
        height: 720,
        toolbar: false
    }), str = '';
    win.on('document-end', function () {
        win.window.document.getElementById('master').src = dest + '/.testData/imgMaster/' + name+ '.png';
        win.window.document.getElementById('slave').src = dest + '/.testData/imgSlave/' + name+ '.png';
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
            str += 'css文本：' + _data[i].cssText + '\n\n';
            str += 'dom节点：' + _data[i].html + '\n';
        }
        win.window.document.getElementById('log').value = str;
    });
};



var App = (function() {
    var App = function(option) {
        this.option = option;
        this.htmlfile = [];
        this.curPage = 0;
        this.processBar = $('#progress .bar');
        this.frame = $('#iframe')[0];
        this.cssPath = '';
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
        $('#nav li').click(function() {
            $('#nav li').removeClass('active');$(this).addClass('active');
            $('.controls').hide(); $('.' + $(this).attr('data-for')).show();
        });
        $('#createVersion').click(function() {
            self.createTestJson();
        });
        $('#startTest').click(function() {
            self.startTest();
        });
        $('#laodTestData').click(function() {
            self.readFolder(self.dest);
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
                fs.mkdirSync(self.dest + '/.testdata/imgMaster');
                fs.mkdirSync(self.dest + '/.testdata/imgSlave');
            }
            self.htmlfile = [];
            self.loadTestData();
            self.readFolder(fileList[0].path);
        });
        $('#filePathDialog').change(function() {
            $('#dest').val(this.value);
            self.dest = this.value;
            if(!fs.existsSync(self.dest + '/.testdata/')) {
                fs.mkdirSync(self.dest + '/.testdata');
                fs.mkdirSync(self.dest + '/.testdata/imgMaster');
                fs.mkdirSync(self.dest + '/.testdata/imgSlave');
            }
            self.htmlfile = [];
            self.loadTestData();
            self.readFolder(this.value);
        });
    };
    //清理css功能start
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
        var self = this,
            hit = {},
            useFulCss = {},
            _useFulCssSelecter = [],
            cssText = fs.readFileSync(cssPath, 'utf-8');
        self.cssSelecter = self.getSelecter(cssText);
        self.tip('css扫描中，请稍后', '');

        _scan();

        function _scan() {
            for(var i = self.curPage; i < self.htmlfile.length; i++) {
                self.frame.src = self.htmlfile[i].path;
                self.frame.onload = function() {
                    for (var j = 0; j < self.cssSelecter.length; j++) {
                        try{
                            var _selecter = _filterCssSelecter(self.cssSelecter[j]),
                                _dom = this.contentWindow.document.querySelectorAll(_selecter),
                                _l = _dom.length,
                                _domHtml = '',
                                _key = md5(self.cssSelecter[j]);
                            hit[_key] = hit[_key] ? hit[_key] + _l : _l;

                            if(_l > 0) {
                                useFulCss[_key] = useFulCss[_key] ? useFulCss[_key] : [];
                                for(var k = 0; k < _l; k++) {
                                    _domHtml +=
                                      '\n================第'+ k +'个被命中的节点开始===============\n'
                                    + _dom[k].outerHTML
                                    + '\n================第'+ k +'个被命中的节点结束===============\n'
                                }
                                useFulCss[_key].push({
                                    path: self.htmlfile[i].path,
                                    html: _domHtml,
                                    selecter: self.cssSelecter[j],
                                    cssText:
                                          '\n******************************************************\n'
                                        + self.getCssText(cssText, self.cssSelecter[j])
                                        + '\n******************************************************'
                                });
                                _useFulCssSelecter.push(self.cssSelecter[j]);
                                //break;
                            }
                        } catch(e) {
                            continue;
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
                            window.setTimeout(_scan, 200);
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
        function _filterCssSelecter(selecter) {
            var jsSelecter = $('#filterJsClass').val().split(',');
            if(jsSelecter.length !== 0) {
                for(var i = 0; i < jsSelecter.length; i++) {
                    selecter = selecter.replace(new RegExp('.' + jsSelecter[i], 'g'), '');
                }
            }
            return selecter.split(':')[0];
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
    //清理css功能end
    App.prototype.createTestJson = function(fileSrc, callback) {
        if(this.htmlfile.length === 0) {
            this.tip('请先选择html目录', 'alert-error');
            return;
        }
        var self = this,
            ver = self.dest + '/.testdata/';
        self.tip('测试数据创建中，请稍后', '');
        $(self.frame).css({
            width: $('#iframeWidth').val(),
            height: $('#iframeHeight').val()
        });

        _create(fileSrc);
        function _create(fileSrc) {
            self.frame.src = fileSrc ? fileSrc : self.htmlfile[self.curPage].path;
            self.frame.onload = function() {
                var frame = this;
                window.setTimeout(function() {
                    var nodes = frame.contentWindow.document.getElementsByTagName('*'),
                        json = JSON.stringify(self.getStyleJson(nodes)),
                        _fileName = fileSrc ? path.basename(fileSrc) : self.htmlfile[self.curPage].name;
                    if(!fileSrc){
                        self.curPage++;
                    }
                    fs.writeFile(ver + '/' + _fileName + '.json', json, 'utf-8');
                    self.createPrintscreen(frame.src, _fileName);
                    //fs.writeFile(ver + '/' + self.htmlfile[self.curPage].name + '.json', json, 'utf-8');

                    self._showProcess();
                    if(self.curPage == self.htmlfile.length || fileSrc) {
                        self.tip('版本生成成功', 'alert-success');
                        self.loadTestData();
                        self.curPage = 0;
                        callback && callback();
                    } else {
                        if(!fileSrc) _create();
                    }
                }, 300)
            };
        }
    };
    App.prototype.startTest = function() {
        var self = this;
        var testDataPath = this.dest + '/.testdata/',
            testData;
        this.clearMsg();
        self.tip('测试中，请稍后', '');
        $(self.frame).css({
            width: $('#iframeWidth').val(),
            height: $('#iframeHeight').val()
        });
        _contrast();
        function _contrast() {
            for(var i = self.curPage; i < self.htmlfile.length; i++) {
                try{
                testData = JSON.parse(fs.readFileSync(testDataPath + '/' + self.htmlfile[i].name + '.json', 'utf8'));
                } catch (e) {
                    self.tip('缺少'+ self.htmlfile[i].name +'的测试用例，测试终止', 'error');
                    self.curPage = 0;
                    //self.readFolder(self.dest);
                    $('#progress').hide();
                    return;
                }
                (function() {
                    var tmp = i;
                    self.frame.src = self.htmlfile[i].path;
                    self.frame.onload = function() {
                        var frame = this;
                        window.setTimeout(function() {
                            var nodes = frame.contentWindow.document.getElementsByTagName('*');
                            self.curPage++;
                            $('#outPutMsg').append(render({"msg" :
                                self.contrastPage(nodes, testData, self.htmlfile[tmp].path, PhantomRender, self.dest, self.frame.src)
                                })
                            );
                            self._showProcess();
                            if(self.curPage == self.htmlfile.length) {
                                self.tip('测试完毕', 'alert-success');
                                self.curPage = 0;
                            } else {
                                _contrast();
                            }
                        }, 300);
                    };
                })();

                break;
            }
        }
    };
    App.prototype.createPrintscreen = function(filePath, fileName) {
        //console.log(filePath)
        PhantomRender.render(filePath, fileName, this.dest + '/.testdata/imgMaster/', function() {
            console.log(1)
        })
    };
    App.prototype.loadTestData = function() {
        this.testData = FileOperater.fileMapping(this.dest + '/.testdata');
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
        var files = FileOperater.scanFolder(fpath), msg = [], type, file;
        this.htmlfile = [];
        for(var name in files) {
            file = files[name];
            if(path.extname(file) === '.html') {
                this.htmlfile.push({
                    "name" : path.basename(file),
                    "path" : file
                });
                if( !fs.existsSync(this.dest + '/.testdata/' + path.basename(file) + '.json') ) {
                    type = 1
                } else {
                    type = 0;
                }
                msg.push({
                    "txt": '读取' + path.basename(file) + '成功',
                    "type": type,
                    "id": file.replace(/\\/g, '\\\\')
                });
            }
        }
        this.tip('html文件读取成功', 'alert-success');
        $('#outPutMsg').html(renderLoad({"msg" : msg}));
    };

    App.prototype.tip = function(txt, cls) {
        $('#alert').html(txt)[0].className = 'alert ' + cls;
    };
    App.prototype.clearMsg = function() {
        $('#outPutMsg').html('');
    };

    App.prototype.init = function() {
        preventDefault();
        this.dragBox = $('#' + this.option.dragBox);
        this.dest = $('#dest').val();
        if(!fs.existsSync(this.dest + '/.testdata/')) {
            fs.mkdirSync(this.dest + '/.testdata');
        }



        this.bindEvent();
        this.loadTestData();
        this.readFolder(this.dest);
    };
    return App;
})();

$(document).ready(function() {
    var app = new App({
        dragBox : 'dragUpload'
    });
    app.init();
    window.app = app;
});
