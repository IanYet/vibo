
const fs = require('fs')

/**
 * return a promise with content string
 * @param {String} path path + filename + ext
 */
const getFilePromise = (path) => new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            reject(err)
        } else {
            resolve(data.toString())
        }
    })
})

/**
 * write the final context to xxx.html
 * @param {String} path path + filename + ext
 * @param {String} context formatted text
 */
const setFilePromise = (path, context) => new Promise((resolve, reject) => {
    fs.writeFile(path, context, (err) => {
        if(err) {
            reject(err)
        }else {
            resolve(context)
        }
    })
})

module.exports = {
    getFilePromise,
    setFilePromise,
}