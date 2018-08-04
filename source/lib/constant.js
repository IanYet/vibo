const path = require('path')
//-----------------------dir-----------------------//
//dir: vibo/
module.exports.ROOT_DIR = path.normalize(`${__dirname}/../../`)

//dir: vibo/source/post/
module.exports.POST_DIR = path.normalize(`${__dirname}/../post/`)

//dir: vibo/document/
module.exports.DOCS_DIR = path.normalize(`${__dirname}/../../document/`)