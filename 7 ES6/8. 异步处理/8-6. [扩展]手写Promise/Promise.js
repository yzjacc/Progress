const Promise = (()=>{
    const PENDING = 'pending',
        REJECTED = 'rejected',
        RESOLVED = 'resolved',
        PromiveValue = Symbol("PromiseValue"),
        PromiseStatus = Symbol("PromiseStatus"),
        thenables = Symbol("thenables"),
        catchables = Symbol("catchbles"),
        changeStatus = Symbol("changeStatus"),
        settleHandle = Symbol("settleHandle"),
        linkPromise = Symbol("linkPromise")

        return class promise {
            [changeStatus](newStatus, newValue, queue){
                if(this[PromiseStatus] !== PENDING){
                    return
                }
                this[PromiseStatus] = newStatus;
                this[PromiveValue] = newValue;
                queue.forEach(handler => handler(newValue));
            }

            constructor(fun) {
                this[PromiseStatus] = PENDING;
                this[PromiveValue] = undefined;
                this[thenables] = [];
                this[catchables] = [];

                const resolve = data =>{
                    this[changeStatus](RESOLVED, data, this[thenables]);
                }
                const reject = reason =>{
                    this[changeStatus](REJECTED, reason, this[catchables]);
                }
                try {
                    fun(resolve,reject);
                }
                catch (e) {
                    reject(e);
                }
            }
            [settleHandle](handler, immediatelyStatus, queue){
                if(typeof handler !== "function"){
                    return;
                }
                if(this[PromiseStatus] === immediatelyStatus){
                    setTimeout(()=>{
                        handler(this[PromiveValue]);
                    },0)
                }else{
                    queue.push(handler)
                }
            }
            [linkPromise](thenable,catchable){
                return new Promise((resolve,reject) => {
                    this[settleHandle](data => {
                        try {
                            const result = thenable(data)
                            resolve(result);
                        }catch (e) {
                            reject(e);
                        }
                    },RESOLVED,this[thenables])

                    this[settleHandle](err=> {
                        try {
                            const result = catchable(err)
                            resolve(result);
                        }catch (e) {
                            reject(e);
                        }
                    },REJECTED,this[catchables])
                })
            }
            then(thenable,catchable){
               return this[linkPromise](thenable,catchable)
            }
            catch(catchable){
               return this[settleHandle](catchable,REJECTED,this[catchables])
            }

        }

}
)();


