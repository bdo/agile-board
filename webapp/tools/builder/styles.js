const path = require('path')
const fse = require('fs-extra')
const less = require('less')

const CleanCss = require('clean-css')
const cleanCss = new CleanCss({ compatibility: '*' })

const red = '\x1b[31m'
const green = '\x1b[32m'
const reset = '\x1b[0m'

const lessify = cwd => async file => {
    const content = await fse.readFile(file, 'utf8')

    let parsedCss
    try {
        const result = await less.render(content, { paths: cwd })
        parsedCss = result.css
    } catch (error) {
        console.error(`> ${red}Error in ${file}: ${error.message}${reset}`)
    }

    if (!parsedCss) return
    if (process.env.NODE_ENV === 'production') return cleanCss.minify(parsedCss).styles
    return parsedCss
}

exports.buildFile = cwd => async filename => {
    const file = path.join(cwd, filename)
    const parsedCss = await lessify(cwd)(file)
    if (!parsedCss) return
    const parsedFile = path.parse(file)
    const destination = path.join(parsedFile.dir, `${parsedFile.name}.css`)
    await fse.writeFile(destination, parsedCss, 'utf8')
    console.log(`> ${green}${file}${reset}`)
}
