const path = require('path')
const readdir = require('recursive-readdir')

const { buildFile } = require('./builder/styles')

const lessCwd = path.join(__dirname, '..', 'src')

readdir(lessCwd, ['!**/*.less']).then(files => files.forEach(file => buildFile(lessCwd)(path.relative(lessCwd, file))))
