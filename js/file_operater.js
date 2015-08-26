/**
 * Created by xiaoweili on 2015/8/26.
 */
var path = require('path'),
    fs = require('fs');
var FileOperater = {
    fileMapping : function(fpath) {
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
    },
    scanFolder : function (fpath){
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
    deleteFolderRecursive : function(fpath) {
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
    }
};
module.exports = FileOperater;