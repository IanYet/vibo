const fs = require('fs')
const crypto = require('crypto')

const { DOCS_DIR, DB_DIR } = require('./constant')
const { setFilePromise } = require('../lib/utils')

const filesHash = require('../db/hash.json')
const filesInfo = require('../db/info.json')

const walkPromise = new Promise((resolve, reject) => {
    fs.readdir(DOCS_DIR, (err, files) => {
        if (err) {
            reject()
        } else {
            resolve(files)
        }
    })
})

const updateInfo = (fileContent) => {
    const reg = /===[\S|\s]+?===/g
    const randomSplit = Math.random().toString(36).substr(2, 8)
    const infoArray = fileContent.match(reg)[0].replace('===', '').replace(/\n+/g, randomSplit).split(randomSplit)
    const info = {}

    infoArray.forEach((value) => {
        value = value.replace(/\s/g, '').replace(/：/g, ':').replace(/，/g, ',')

        
    })
}

module.exports = walkPromise.then((files) => {
    const changedFiles = []

    files.forEach((file) => {
        const fileContent = fs.readFileSync(DOCS_DIR + file)
        const fileHash = crypto.createHash('md5').update(fileContent).digest('hex')

        if (!filesHash[file] || fileHash !== filesHash[file]) {
            changedFiles.push(file)
            filesHash[file] = fileHash
        }
    })

    return changedFiles

}).then((changedFiles) => setFilePromise(`${DB_DIR}hash.json`, JSON.stringify(filesHash))
    .then(() => changedFiles))
    .catch((err) => console.log(err))