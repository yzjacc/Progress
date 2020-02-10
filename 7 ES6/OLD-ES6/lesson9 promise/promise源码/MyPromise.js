function MyPromise (executor) {
    var self = this;
    self.status = 'pending';
    self.resolveValue = null;
    self.rejectReason = null;
    self.ResolveCallBackList = [];
    self.RejectCallBackList = [];

    function resolve (value) {
        if (self.status === 'pending') {
            self.status = 'Fulfilled';
            self.resolveValue = value;
            self.ResolveCallBackList.forEach(function (ele) {
                ele();
            });
        }  
    }

    function reject (reason) {
        if (self.status === 'pending') {
            self.status = 'Rejected';
            self.rejectReason = reason;
            self.RejectCallBackList.forEach(function (ele) {
                ele();
            });            
        }  
    }
    
    try {
        executor(resolve, reject);
    }catch(e) {
        reject(e);
    } 
};
function ResolutionRetrunPromise (nextPromise, returnValue, res, rej) {
    if (returnValue instanceof MyPromise) {
        // Promise 对象
        returnValue.then(function (val) {
            res(val);
        }, function (reason) {
            rej(reason)
        });
    }else {
        res(returnValue);
    }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    if (!onFulfilled) {
        onFulfilled = function (val) {
            return val;
        }
    }
    if (!onRejected) {
        onRejected = function (reason) {
            throw new Error(reason);
        }
    }    
    var self = this;

    var nextPromise = new MyPromise(function (res, rej) {
        if (self.status === 'Fulfilled') {
            setTimeout(function () {
                try {
                    // var nextResolveValue = onFulfilled(self.resolveValue);
                    // res(nextResolveValue);
                    var nextResolveValue = onFulfilled(self.resolveValue);
                    ResolutionRetrunPromise(nextPromise, nextResolveValue, res, rej);
                }catch(e) {
                    rej(e);
                }

            }, 0);
        }
    
        if (self.status === 'Rejected') {
            setTimeout(function () {
                try {
                    var nextRejectValue = onRejected(self.rejectReason);
                    ResolutionRetrunPromise(nextPromise, nextRejectValue, res, rej);
                }catch(e) {
                    rej(e);
                }

            }, 0);
        }
    
        // 
        if (self.status === 'pending') { 
            self.ResolveCallBackList.push(function () {
                try {
                    var nextResolveValue = onFulfilled(self.resolveValue);
                    ResolutionRetrunPromise(nextPromise, nextResolveValue, res, rej);
                }catch(e) {
                    rej(e);
                }
            });
    
            self.RejectCallBackList.push(function () {
                setTimeout(function () {
                    try {
                        var nextRejectValue = onRejected(self.rejectReason);
                        ResolutionRetrunPromise(nextPromise, nextRejectValue, res, rej);
                    }catch(e) {
                        rej(e);
                    }
                }, 0);
            });        
        }
    });
    return nextPromise;
};


MyPromise.race = function(promiseArr) {
    return new MyPromise(function (resolve, reject) {
        promiseArr.forEach(function (promise, index) {
           promise.then(resolve, reject);
        });
    });
};