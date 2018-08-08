const marked = require('marked')

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

module.exports = {
    markdownToHtml,
    mixinHtml,
}