module.exports = function (Socket) {

    var crypto = require('crypto');

    Socket.prototype.giveme = function(event, callback, args, timeout) {
        var md5sum = crypto.createHash('md5');
        var self = this;    
        var requestId = md5sum.update(event + JSON.stringify(args) + timeout.toString() + JSON.stringify(callback)).digest('hex');
        if(typeof args === 'string'){
            args = {data:args};
        }else if ( args instanceof Array ){
            args = {data: args};
        }
        if(typeof self.promiseDelay === 'undefined')
            self.promiseDelay = {};
        args.requestId = requestId;

        var timedOutOrEventEmitted = function(data){
            if(data.requestId == requestId){
                self.removeListener(event, timedOutOrEventEmitted);
                self.promiseDelay[requestId] = clearTimeout(self.promiseDelay);
                delete data.requestId;
                delete self.promiseDelay[requestId];
                callback(data, self);
            }
        };
        this.emit(event, args);
        this.on(event, timedOutOrEventEmitted);
        self.promiseDelay[requestId] = setTimeout(function(){
            timedOutOrEventEmitted({ data: { requestId: requestId } });
        }, timeout);
    };
};
