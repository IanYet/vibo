const marked = require('marked')

/**
 * convert markdown to html
 * @param {String} context markdown string
 */
const markdownToHtml = (context) => {
    
    //TODO marked option
    return marked(context)
}

module.exports = {
    markdownToHtml,
}