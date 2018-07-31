
class Vibo {
    constructor () {
        // this.viboConfig = viboConfig
        this.pipe = []
    }

    callback (context) {
        console.log(context)
    }
    use (middleware) {
        this.pipe.push(middleware)
    }

    init (context) {
        let promise = Promise.resolve(context)

        this.pipe.forEach((middleware) => {
            promise = this.nextPromise(promise, middleware)
        })
    }

    nextPromise (promise, middleWare) {
        return promise.then((context) => middleWare(context))
    }
}

const vibo = new Vibo()

const asyncAdd1 = (ctx) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            ctx++
            console.log(ctx);
            resolve(ctx)
        }, 1000)
    })
}

const add1 = (ctx) => {
    ctx++
    console.log(ctx);
    return ctx
}
const min1 = (ctx) => {
    ctx--
    console.log(ctx);
    return ctx
}

vibo.use(add1)
vibo.use(asyncAdd1)
vibo.use(min1)
vibo.init(2)