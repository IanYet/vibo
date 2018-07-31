
class Vibo {
    constructor() {
        // this.viboConfig = viboConfig
        this.pipe = []
    }

    callback(context) {
        console.log(context)
    }
    use(middleware) {
        this.pipe.push(middleware)
    }

    init(context) {
        let promise = Promise.resolve(context)

        this.pipe.forEach((middleware) => {
            promise = nextPromise(promise, middleware)
        })
    }
}

//私有方法
const nextPromise = (promise, middleWare) => promise.then((context) => middleWare(context))

//导出模块
module.exports = {
    Vibo,
}