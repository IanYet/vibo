

/**
 * highlight text
 * @param {String} context string formatted by previous middleware
 */
const highlightText = (context) =>
context.replace(/(?<!\\)=\S+?(?<!\\)=/g, (highlightBlock) =>
    `<span class="highlight">${highlightBlock.slice(1, code.length - 1)}</span>`
)

module.exports = {
    highlightText,
}