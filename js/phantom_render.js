/**
 * Created by xiaoweili on 2015/8/26.
 */

var phantomjs = require('phantomjs');
var path = require('path');
var childProcess = require('child_process');
var binPath = phantomjs.path;

var PhantomRender = {
    render: function(htmlPath, imgName, createPath, redNodes, callback) {
        if(redNodes.length > 0) {
            redNodes = redNodes.join('!#!')
        }
        var childArgs = [
            path.join( './js/render.js'),
            htmlPath + '!@!' +imgName + '!@!' + createPath + '!@!' + redNodes
        ];
        //console.log(childArgs);
        childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
            console.log(err);
            console.log(stdout);
            console.log(stderr);
            callback && callback();
        });
    }
};
module.exports = PhantomRender;