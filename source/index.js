const path = require('path')

const { Vibo } = require('./lib/Vibo')
const { DOCS_DIR, POST_DIR } = require('./lib/constant')
const { getFilePromise, setFilePromise, getHtmlPath } = require('./lib/utils')
const { markdownToHtml, mixinHtml, hightHtml } = require('./middleware/defaultWares')

const vibo = new Vibo({})
const startPromise = getFilePromise(`${DOCS_DIR}vi-blog.md`)

vibo.use(markdownToHtml)
vibo.use(hightHtml)
vibo.use(mixinHtml)

const htmlPath = path.normalize(`${POST_DIR}${getHtmlPath(`${DOCS_DIR}vi-blog.md`)}`)

vibo.go(startPromise)
    .then((context) => setFilePromise(htmlPath, context))
    .catch((err) => console.log(err))