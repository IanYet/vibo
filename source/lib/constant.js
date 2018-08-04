const path = require('path')
//-----------------------path-----------------------//
//path: vibo/
module.exports.ROOT_PATH = path.normalize(`${__dirname}/../../`)

//path: vibo/source/post/
module.exports.POST_PATH = path.normalize(`${__dirname}/../post/`)

//path: vibo/document/
module.exports.DOCS_PATH = path.normalize(`${__dirname}/../../document/`)