
/**
 * Created by xiaoweili on 2015/8/17.
 */
var CleanCSS = require('clean-css'),
    path =  require('path'),
    md5 = require('md5');

//css处理类
var CssOperater = (function() {
    var Operater = function() {};
    Operater.prototype.getStyleJson = function (nodes) {
        var res = {};
        for(var i = 0; i < nodes.length; i++) {
            res[md5(i + nodes[i].tagName)] = this._getStyle(nodes[i]);
        }
        return res;
    };
    //获取dom节点计算样式
    Operater.prototype._getStyle = function (obj) {
        var cupStyle = window.getComputedStyle(obj);
        var res = {};
        for(var name in cupStyle) {
            if(!isNaN(parseInt(name))) {
                continue;
            }
            if( cupStyle[name] && typeof(cupStyle[name]) === 'string' && name !== 'cssText' ) {
                res[name] = cupStyle[name];
            }
        }
        return res;
    };
    //删除无用样式
    Operater.prototype.delUselsessSelecter = function (str, selecter) {
        var _selecter, regComma, regStyle, length = selecter.length;
        str = str.replace(/\s+[>]\s+/g, '>');
        for (var i = 0; i < length; i++) {
            _selecter = selecter[i].replace(/[\(\)\^\[\]\*\\\/]/g, '\\$1').
                                    replace(/\s+/g, '\\s');
            regComma  = new RegExp('([},\\t\\n\\s\\/]+)' + _selecter + '\\s*,', "g");
            regStyle  = new RegExp('([},][\\t\\n\\s\\/]*|\\*\\/[\\t\\n\\s\\/]*)' + _selecter + '\\s*{([^}]*)}', "g");
            str       = str.replace(regComma, '$1').replace(regStyle, '$1');
        }
        return str;
    };
    //获取所有的css选择器
    Operater.prototype.getSelecter = function (str) {
        var minified = "}" + new CleanCSS().minify(str).styles,
            selecter = [],
            reg = new RegExp("}([^{}%@]*){","g"),
            mediaFilter = new RegExp(/@media[^{}]*{/g),
            charsetFilter = new RegExp(/@charset[^{}]*;/g);

        minified = minified.replace(mediaFilter, "$&}").replace(charsetFilter, "$&}");
        var tmparray = minified.match(reg);

        for (var i = 0; i < tmparray.length; i++) {
            var tmpStr = tmparray[i].replace('}','').replace('{','');
            selecter.push(tmpStr);
        }
        return selecter.join(',').split(',');
    };
    //获取选择器内容
    Operater.prototype.getCssText = function(str, selecter) {
        var _selecter = selecter.replace(/[\(\)\^\[\]\>\<]/g, '\\$1');
        var reg  = new RegExp(_selecter + '[^}]*?}', "g");
        return str.match(reg)[0];
    };
    Operater.prototype.contrastPage = function (nodes, testData, pageName, PhantomRender, dest, src, callback) {
        var flag = false,
            msg = [],
            str = '',
            pid = md5(pageName),
            _hasChangedNodes = [];
            _hasChangedNodesPosition = [];
        for(var i = nodes.length - 1; i >= 0; i--) {
            var node = this._getStyle(nodes[i]),
                testDataTmp = testData[md5(i + nodes[i].tagName)];
            if(!testDataTmp) {

            }
            else if( JSON.stringify(node) !== JSON.stringify(testDataTmp) ) {
                if(!flag) {
                    str += "网页"+ pageName + "有变化\n";
                }
                flag = flag ? flag : true;
                if(_hasChangedChild(nodes[i].outerHTML)) {
                    continue;//有子节点发生改变的节点就不统计了
                }
                str += "\n**********************************************************************\n元素" + nodes[i].outerHTML + '发生了改变\n**********************************************************************\n';
                _hasChangedNodes.push(nodes[i].outerHTML);
                _hasChangedNodesPosition.push(i);
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
                "id": pid,
                "fileName": path.basename(pageName),
                "dest": dest
            });
        }
        global.data[pid] = {"data" : str};
        PhantomRender.render(src, path.basename(pageName), dest + '/.testdata/imgSlave/', _hasChangedNodesPosition);
        return msg;
        //判断是否有子节点发生改变
        function _hasChangedChild(str) {
            //console.log(str)
            for(var i = 0; i < _hasChangedNodes.length; i++) {
                if( str.indexOf(_hasChangedNodes[i]) > 0 ) {
                    return true;
                }
            }
            return false;
        }
    };
    return Operater;
})();
module.exports = CssOperater;