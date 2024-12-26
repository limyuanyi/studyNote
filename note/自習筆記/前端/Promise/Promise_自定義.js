class Promise{
    //Promise自定義封裝
    constructor(executor){
        //添加屬性
        this.PromiseState = 'pending';
        this.PromiseResult = null;
        //聲明屬性
        this.callbacks = [];

        const self = this;
        function resolve(data){
            //1.修改對象狀態(promiseState)
            if(self.PromiseState !== 'pending') return;
            self.PromiseState = 'fulfilled';
            //2.設置對象結果值(promiseResult)
            self.PromiseResult = data;
            //黨調用成功的回調函數
            //代表存在異步，then内PromiseState還處在pending
            // if(self.callback.onResolved){
            //     self.callback.onResolved(data);
            // }

            //遍歷多個回調
            setTimeout(()=>{
                self.callbacks.forEach(item =>{
                    item.onResolved(data);
                });
            });
        }

        function reject(data){
            if(self.PromiseState !== 'pending') return;
            self.PromiseState = 'rejected';
            self.PromiseResult = data;

            // if(self.callback.onRejected){
            //     self.callback.onRejected(data);
            // }
            setTimeout(()=>{
                self.callbacks.forEach(item =>{
                    item.onRejected(data);
                })
            });
        }

        try{
        //同步調用[執行器函數]
            executor(resolve,reject);
        }catch(e){
            //修改狀態
            reject(e);
        }
    }

    //then方法
    then(onResolved,onRejected){
        const self=this;

        //判斷回調函數參數
        if(typeof onRejected !== 'function'){
            onRejected = reason =>{
                throw reason;
            }
        }
    
        if(typeof onResolved !== 'function'){
            onResolved = value =>value;
        }
    
        return new Promise((resolve,reject) =>{
    
            function callback(type){
                try{
                    let result = type(self.PromiseResult); 
                    if(result instanceof Promise){
                        result.then(v =>{
                            resolve(v);
                        },r =>{
                            reject(r);
                        })
                    }else{
                        resolve(result);
                    }
                }catch(e){
                    reject(e);
                }
            }
    
            if(this.PromiseState === 'fulfilled'){
                setTimeout(() => {
                    callback(onResolved);
                });
            }
    
            if(this.PromiseState === 'rejected'){
                setTimeout(() => {
                    callback(onRejected);
                });        
            }
            //判斷pending狀態
            if(this.PromiseState === 'pending'){
    
                //保存回調函數
                this.callbacks.push({
                    onResolved: function(){
                        callback(onResolved);
                    },
                    onRejected: function(){
                        callback(onRejected);
                    }
                });
            }
        })
    }

    //catch方法
    catch(onRejected){
        return this.then(undefined,onRejected);
    }

    //屬於Promise類，但是不屬於實例對象
    //resolve方法
    static resolve(value){
        return new Promise((resolve,reject) =>{
            if(value instanceof Promise){
                value.then(v => {
                    resolve(v);
                }, r=>{
                    reject(r);
                })
            }else{
                resolve(value);
            }
        });
    }

    //reject方法
    static reject(reason){
        return new Promise((resolve,reject) => {
            reject(reason);
        })
    }

    //all方法
    static all(promises){
        let count = 0;
        let arr= [];
        //返回結果為promise對象
        return new Promise((resolve,reject) => {
            //遍歷
            for(let i=0;i<promises.length;i++){
                //
                promises[i].then(v => {
                    count++;
                    //將當前promise對象成功的結果存入arr
                    arr[i] = v;
                    if(count === promises.length){
                        resolve(arr);
                    }
                },r =>{
                    reject(r);
                })
            }
        });
    }

    //race方法
    static race(promises){
        return new Promise((resolve,reject) => {
            for(let i=0;i<promises.length;i++){
                promises[i].then(v =>{
                    resolve(v);
                },r =>{
                    reject(r);
                })
            }
        });
    }
}


