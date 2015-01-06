module.exports = function (Socket) {

    Socket.prototype.givePromise = function(event, callback, timeout) {
        var self = this;

        var timedOutOrEventEmitted = function(data){
            self.removeListener(event, timedOutOrEventEmitted);
            callback(data, self);
            this.promiseDelay = clearTimeout(self.promiseDelay);
        };
        this.on(event, timedOutOrEventEmitted);
        this.promiseDelay = setTimeout(timedOutOrEventEmitted, timeout);
    };
};
