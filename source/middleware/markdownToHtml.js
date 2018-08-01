const marked = require('marked')


const markdownToHtml = (context) => {
    
    //TODO marked option
    return marked(context)
}

module.exports = {
    markdownToHtml,
}