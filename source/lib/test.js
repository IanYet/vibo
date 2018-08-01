const { Vibo } = require('./Vibo')
const { DOCS_PATH } = require('../lib/constant')
const { getFilePromise } = require('../lib/utils')
const { markdownToHtml } = require('../middleware/markdownToHtml')

const vibo = new Vibo({})
const startPromise = getFilePromise(`${DOCS_PATH}vi-blog.md`)

vibo.use(markdownToHtml)
vibo.go(startPromise)