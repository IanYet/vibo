const path = require('path')

const { Vibo } = require('./lib/Vibo')
const { DOCS_PATH, POST_PATH } = require('./lib/constant')
const { getFilePromise, setFilePromise, getHtmlPath } = require('./lib/utils')
const { markdownToHtml } = require('./middleware/defaultWares')

const vibo = new Vibo({})
const startPromise = getFilePromise(`${DOCS_PATH}vi-blog.md`)

vibo.use(markdownToHtml)

console.log(`${DOCS_PATH}vi-blog.md`);
const viboPromise = vibo.go(startPromise)
viboPromise.then((context) => setFilePromise(path.normalize(`${POST_PATH}${getHtmlPath(`${DOCS_PATH}vi-blog.md`)}`), context)).catch((err) => console.log(err))