
const fs = require('fs')

/**
 * return a promise with content string
 * @param {String} path path + filename + ext
 */
const getFilePromise = (path) => new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
        if(err){
            reject(err)
        }else{
            resolve(data.toString())
        }
    })
})

module.exports = {
    getFilePromise,
}