
function UserException(message){
    this.message = message;
    this.name = "UserException";
}

UserException.prototype.toString = function(){
    return this.name + ': "' + this.message + '"';
}

module.exports = UserException;