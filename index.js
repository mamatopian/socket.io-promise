module.exports = function (Socket) {

    Socket.prototype.giveme = function(event, callback, args, timeout) {
        var self = this;
        var id = Math.random().toString().replace('.','');

        var timedOutOrEventEmitted = function(data){
            self.removeListener(event, timedOutOrEventEmitted);
            delete data.requestId;
            callback(data, self);
            self.promiseDelay = clearTimeout(self.promiseDelay);
        };
        this.emit(event, args);
        this.on(event, timedOutOrEventEmitted);
        this.promiseDelay = setTimeout(timedOutOrEventEmitted, timeout);
    };
};
