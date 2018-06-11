var fileHandler = require('./fileHandle');
var db_config = require('./config.json');
var UserException = require('./exception')

var db_dir_location = db_config['data_folder_location'] + db_config['data_folder_name'];

function DBClient(){
    this.db_directory = db_dir_location;
    this.data = [];

    this.getDataAry();
}


DBClient.prototype.getTemporaryNumber = function(attribute, value){
    for(var i=0; i<this.data.length; i++){
        if(value == this.data[i][attribute]){
            return this.data[i].fakeNum;
        }
    }

    throw new UserException('there are no attribute');
}


DBClient.prototype.getQRCode = function(attribute, value){
    for(var i=0; i<this.data.length; i++){
        if(value == this.data[i][attribute]){
            return this.data[i].QRCode;
        }
    }

    throw new UserException('there are no attribute');
}


DBClient.prototype.postData = function(data){
    this.data.push(data);

    var fileName = this.db_directory + '/' + data['id'] + '.json';
    
    try{
        fileHandler.writeJSONFile(fileName, data);
   }catch(exception){
        return exception;
   }
}

DBClient.prototype.getDataAry = function(){
    if(fileHandler.existFileOrDir(this.db_directory)){
        var files = fileHandler.getFileListInDir(this.db_directory);
        
        for(var i=0; i<files.length; i++){
            var newData = fileHandler.readJSONFile(this.db_directory + '/' + files[i]);
            this.data.push(newData);
        }
    }else{
        throw new UserException('there are no directory exist');
    }
};

module.exports = DBClient;
