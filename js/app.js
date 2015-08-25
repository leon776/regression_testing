/**
 * Created by xiaoweili on 2015/8/25.
 */
var CssOperater = require('./css_operater');
var path = require('path'),
    fs = require('fs'),
    md5 = require('md5'),
    moment = require('moment'),
    template = require('art-template'),
    msgTepl, render, msgTeplCss, renderCss;



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
                            var _dom = this.contentWindow.document.querySelectorAll(self.cssSelecter[j].split(':')[0]),
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
                                _useFulCssSelecter.push(cssText, self.cssSelecter[j]);
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
            testData, _msg;
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
                        //var t = self.contrastPage(nodes, testData, self.htmlfile[tmp].path);
                        console.log(123)
                        //$('#outPutMsg').append(render({"msg" : 123}));
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
module.exports = App;