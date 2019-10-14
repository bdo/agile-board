const Router = require('koa-router')
const router = new Router()
const HttpStatus = require('http-status')

const { User } = require('../db')

router.get('/', async ctx => {
    ctx.status = HttpStatus.OK
    ctx.body = await User.findAll()
})

module.exports = router
