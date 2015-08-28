var page = require('webpage').create();

var args = require('system').args;
args = args[1].split('!@!');

var url = args[0];
var changeNode = args[3] ? args[3].split('!#!') : [];
var w = args[4] ? Number(args[4]) : 'auto';
page.viewportSize = {
    width: w,
    height: 1280
};

page.open(url, 'GET', changeNode, function (status)
{
    if (status != "success") 
    {
        console.log('FAIL to load the address');
        phantom.exit();
    }
    page.evaluate(function(changeNode) {
        //此函数在目标页面执行的，上下文环境非本phantomjs，所以不能用到这个js中其他变量
        Array.prototype.in_array = function(e) {
            for(i=0;i<this.length && this[i]!=e;i++);
            return !(i==this.length);
        };
        window.scrollTo(0,10000);//滚动到底部
        //window.document.body.scrollTop = document.body.scrollHeight;

        window.setTimeout(function() {
            var plist = document.querySelectorAll("*");
            var len = plist.length;
            var el;
            for(var i = 0; i < len; i++) {
                if(changeNode.in_array(i)) {
                    el = plist[i];
                    el.style.border = "1px solid red";
                }
            }
        },1000);
    }, changeNode);
    
    window.setTimeout(function () 
    {
        //page.render(args[2] + '/' + args[1]);
        page.render(args[2] + '/' + args[1] + '.png');
        //page.render("F:/public_html/node-webkit/nwjs-v0.12.2-win-x64/debug/regression_testing/lib/phantomjs-2.0.0-windows/bin/json2form.png");
        phantom.exit();
    }, 3000);

});