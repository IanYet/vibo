const path = require('path')

const { Vibo } = require('./lib/Vibo')
const { DOCS_DIR, POST_DIR } = require('./lib/constant')
const { getFilePromise, setFilePromise, getHtmlPath } = require('./lib/utils')
const { updateBlogInfo, markdownToHtml, mixinHtml, highlightCode } = require('./middleware/defaultWares')

const diffPromise = require('./lib/diff')

function init(tarFileName) {
    const vibo = new Vibo({})
    const startPromise = getFilePromise(DOCS_DIR + tarFileName)

    vibo.use(updateBlogInfo)
    vibo.use(markdownToHtml)
    vibo.use(highlightCode)
    vibo.use(mixinHtml)

    const htmlPath = path.normalize(POST_DIR + getHtmlPath(DOCS_DIR + tarFileName))

    vibo.go(startPromise)
        .then((context) => setFilePromise(htmlPath, context))
        .catch((err) => console.log(err))
}

diffPromise.then((tarFiles) => {
    tarFiles.forEach((tarFile) => init(tarFile))
})