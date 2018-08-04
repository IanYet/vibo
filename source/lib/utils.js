const pt = require('path')
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
        if (err) {
            reject(err)
        } else {
            resolve(context)
        }
    })
})

/**
 * return last half of post file
 * e.g. 2018/09/[name].html
 * @param {String} path originla file's path + filename + ext
 */
const getHtmlPath = (path) => {
    const htmlName = `${pt.basename(path, pt.extname(path))}`
    const now = new Date()
    const [year, month] = [now.getFullYear() + '', now.getMonth() + 1 + '']

    return `${year}/${month.length === 2 ? month : '0' + month}/${htmlName}.html`
}

const dirExist = (path) => new Promise((resolve, reject) => {
    
})
module.exports = {
    getFilePromise,
    setFilePromise,
    getHtmlPath,
}