module.exports = function (Socket) {

    Socket.prototype.givePromise = function(event, args, callback, timeout) {
        var self = this;

        var timedOutOrEventEmitted = function(data){
            self.removeListener(event, timedOutOrEventEmitted);
            callback(data, self);
            self.promiseDelay = clearTimeout(self.promiseDelay);
        };
        this.emit(event, args);
        this.on(event, timedOutOrEventEmitted);
        this.promiseDelay = setTimeout(timedOutOrEventEmitted, timeout);
    };
};
