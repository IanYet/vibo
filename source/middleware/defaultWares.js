const marked = require('marked')
const hljs = require('highlight.js')


const { getFilePromise } = require('../lib/utils')
const { THEME_DIR } = require('../lib/constant')

/**
 * 
 * @param {String} context original context
 */
const updateBlogInfo = (context) => {
    const reg = /===[\S|\s]+?===/g

    console.log(context.match(reg));
    return context
}

/**
 * convert markdown to html
 * @param {String} context string formatted by previous middleware
 */
const markdownToHtml = (context) => {

    //TODO marked option
    return marked(context)
}

/**
 * mixed article string in template html string
 * @param {String} context string formatted by previous middleware
 */
const mixinHtml = (context) => getFilePromise(THEME_DIR('vibo-blog') + 'blog.html')
    .then((templateHtml) => templateHtml.replace('<!-- content -->', context))
    .catch((err) => console.log(err))

/**
 * highlight code
 * @param {String} context article html string
 */
const highlightCode = (context) => {
    const blockReg = /<code[\s|\S]+?<\/code>/g
    const inlineReg = />[\s|\S]+?</g

    return context.replace(blockReg, (codeBlock) => codeBlock.replace(inlineReg, (code) => {
        code = code.slice(1, code.length - 1)
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')

        return `>${hljs.highlightAuto(code).value}<`
    }))
}

module.exports = {
    updateBlogInfo,
    markdownToHtml,
    mixinHtml,
    highlightCode,
}