class Vibo {
    constructor(viboConfig) {
        this.viboConfig = viboConfig
        this.pipe = []
    }

    /**
     * add a middleware to be excuted
     * @param {Function} middleware middleware funtion
     */
    use(middleware) {
        this.pipe.push(middleware)
    }

    /**
     * string or promise obj
     * @param {String|Promise} start vibo middleware chain's start
     */
    go(start) {
        let promise = typeof start === 'string' ? Promise.resolve(context) : start

        this.pipe.forEach((middleware) => {
            promise = nextPromise(promise, middleware)
        })

        return promise.then((context) => context).catch((error) => console.error(error))
    }
}

//private methods
const nextPromise = (promise, middleware) => promise.then((context) => middleware(context))

//---------------
module.exports = {
    Vibo,
}