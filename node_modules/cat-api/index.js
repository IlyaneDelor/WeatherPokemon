var http, images, fs, path;
http = require('http');
fs = require('fs');
path = require('path');

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push('/images/' + path.basename(name));
        }
    }
    return files_;
}

images = getFiles(__dirname + '/images');

module.exports = function(baseUrl) {
    if(!baseUrl) {
        baseUrl = '';
    }
    return function(req, res) {
        var readFile;
        var index = (images.length * Math.random())|0;
        if(req.url === '/') {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                url : baseUrl + images[index]
            }));
        } else if(images.indexOf(req.url) !== -1) {
            readFile = fs.createReadStream(__dirname + req.url);
            readFile.pipe(res);
        } else {
            res.writeHead(404);
            res.end();
        }
    }
};