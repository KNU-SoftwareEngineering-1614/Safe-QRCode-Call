var fs = require('fs');

module.exports.readJSONFile = function(file){
    return JSON.parse(fs.readFileSync(file));
}

module.exports.writeJSONFile = function(file, data){
    var json = JSON.stringify(data);
    fs.writeFile(file, json);
}

module.exports.getFileListInDir = function(dic){
    return fs.readdirSync(dic);
}

module.exports.existFileOrDir = function(path){
    return fs.existsSync(path);
}