const path = require('path')
const chokidar = require('chokidar')

const { buildFile } = require('./builder/styles')

const lessCwd = path.join(__dirname, '..', 'src')

chokidar
    .watch('**/*.less', { cwd: lessCwd, usePolling: true, interval: 300 })
    .on('add', buildFile(lessCwd))
    .on('change', buildFile(lessCwd))
