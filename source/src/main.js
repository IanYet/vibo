
const { Vibo } = require('./Vibo')

const vibo = new Vibo({})

const addOne = ctx => ++ctx

const asyncAddOne = ctx => new Promise((resolve, reject) => {
    setTimeout(() => { 
        resolve(++ctx)
    }, 1000)
})

const errorWare = () => {
    throw new Error('stop')
}

vibo.use(addOne)
// vibo.use(errorWare)
vibo.use(asyncAddOne)

vibo.start(3)