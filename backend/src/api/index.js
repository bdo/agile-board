const Router = require('koa-router')
const router = new Router()
const HttpStatus = require('http-status')

router.get('/', ctx => {
    ctx.status = HttpStatus.OK
    ctx.body = 'Hello world'
})

module.exports = router
