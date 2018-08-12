const pt = require('path')
const fs = require('fs')

const { POST_DIR } = require('./constant')

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
const setFilePromise = (path, context) => checkDir(path).then(() => 
    new Promise((resolve, reject) => {
        fs.writeFile(path, context, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(context)
            }
        })
    }
))

/**
 * split the dirname from '/a/b/c/' to ['/a/' ,'/a/b/', '/a/b/c/']
 * @param {String} dir original dir
 * @param {[String]} dirArr []
 */
const checkDir = (dir, dirArr = []) => {
    dirArr.unshift(pt.normalize(pt.parse(dir).dir + '/'))

    if (dirArr[0] === POST_DIR) {
        return makeDir(dirArr)
    } else {
        return checkDir(dirArr[0], dirArr)
    }
}

/**
 * dirArr created by func checkDir()
 * @param {[String]} dirArr []
 */
const makeDir = (dirArr) => new Promise((resolve, reject) => {
    fs.mkdir(dirArr[0], (err) => {
        if((err && err.code === 'EEXIST') || !err){
            dirArr.shift()
            resolve(dirArr)
        }else {
            reject()
        }
    })
}).then((dirArr) => {
    if(dirArr.length === 0){
        return
    }
    return makeDir(dirArr)
})

//todo
const updateHashPromise = (path) => new Promise((resolve, reject) => {

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

module.exports = {
    getFilePromise,
    setFilePromise,
    getHtmlPath,
}