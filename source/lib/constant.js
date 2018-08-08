const path = require('path')
//-----------------------dir-----------------------//
//dir: vibo/
module.exports.ROOT_DIR = path.normalize(`${__dirname}/../../`)

//dir: vibo/source/post/
module.exports.POST_DIR = path.normalize(`${__dirname}/../post/`)

//dir: vibo/document/
module.exports.DOCS_DIR = path.normalize(`${__dirname}/../../document/`)

//dir: vibo/source/theme/[theme]/
module.exports.THEME_DIR = theme => path.normalize(`${__dirname}/../theme/${theme}/`)