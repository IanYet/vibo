const fs = require('fs')
const crypto = require('crypto')
const path = require('path')

const { DOCS_DIR, DB_DIR } = require('./constant')
const filesHash = require('../db/hash.json')
const { getFilePromise, setFilePromise } = require('../lib/utils')

const walkPromise = new Promise((resolve, reject) => {
    fs.readdir(DOCS_DIR, (err, files) => {
        if (err) {
            reject()
        } else {
            resolve(files)
        }
    })
})

module.exports =  walkPromise.then((files) => new Promise((resolve, reject) => {
    const changedFiles = []

    files.forEach((file, index) => {
        getFilePromise(DOCS_DIR + file).then((fileContent) => {
            const fileHash = crypto.createHash('md5').update(fileContent).digest('hex')

            if (fileHash !== filesHash[file]) {
                changedFiles.push(file)
                filesHash[file] = fileHash
            }

            if (index === files.length - 1) resolve(changedFiles)
        })
    })
})).then((changedFiles) => {
    setFilePromise(`${DB_DIR}hash.json`, JSON.stringify(filesHash)).then(() => console.log(changedFiles))

    return changedFiles
})