module.exports = function (Socket) {

    Socket.prototype.giveme = function(event, callback, args, timeout) {
        var self = this;
        var requestId = Math.random().toString().replace('.','');
        if(typeof args === 'string'){
            args = {data:args};
        }
        args.requestId = requestId;

        var timedOutOrEventEmitted = function(data){
            if(data.requestId == requestId){
                self.removeListener(event, timedOutOrEventEmitted);
                delete data.requestId;
                self.promiseDelay = clearTimeout(self.promiseDelay);
                callback(data, self);
            }
        };
        this.emit(event, args);
        this.on(event, timedOutOrEventEmitted);
        this.promiseDelay = setTimeout(function(){
            timedOutOrEventEmitted({ data: { requestId: requestId } });
        }, timeout);
    };
};
