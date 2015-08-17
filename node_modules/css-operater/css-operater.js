/**
 * Created by xiaoweili on 2015/8/17.
 */
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


