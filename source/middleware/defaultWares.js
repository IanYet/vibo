const marked = require('marked')
const hljs = require('highlight.js')


const { getFilePromise } = require('../lib/utils')
const { THEME_DIR } = require('../lib/constant')



/**
 * convert markdown to html
 * @param {String} context article string
 */
const markdownToHtml = (context) => {
    
    //TODO marked option
    return marked(context)
}

/**
 * mixed article string in template html string
 * @param {String} context article string
 */
const mixinHtml = (context) => getFilePromise(THEME_DIR('vibo-blog') + 'blog.html')
    .then((templateHtml) => templateHtml.replace('<!-- content -->', context))
    .catch((err) => console.log(err))

/**
 * highlight code
 * @param {String} context article html string
 */
const hightHtml = (context) => {
    const blockReg = /<code[\s|\S]+?<\/code>/g
    const inlineReg = />[\s|\S]+?</g

    return context.replace(blockReg, (codeBlock) => codeBlock.replace(inlineReg, (code) => {
        code = code.replace('>', '')
            .replace('<', '')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')

        return `>${hljs.highlightAuto(code).value}<`
    }))
}
module.exports = {
    markdownToHtml,
    mixinHtml,
    hightHtml,
}