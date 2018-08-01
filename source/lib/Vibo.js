
class Vibo {
    constructor(viboConfig) {
        this.viboConfig = viboConfig
        this.pipe = []
    }

    callback(context) {
        console.log(context)
    }

    use(middleware) {
        this.pipe.push(middleware)
    }

    start(context) {
        let promise = Promise.resolve(context)

        this.pipe.forEach((middleware) => {
            promise = nextPromise(promise, middleware)
        })

        promise.then((context) => this.callback(context)).catch((error) => console.error(error))
    }
}

//private methods
const nextPromise = (promise, middleware) => promise.then((context) => middleware(context))

//---------------
module.exports = {
    Vibo,
}