const Router = require('koa-router')
const router = new Router()
const HttpStatus = require('http-status')

// To be replaced with real database
const USERS = [{ id: 1, name: 'Judith' }, { id: 2, name: 'Oliver' }, { id: 3, name: 'Jonah' }, { id: 4, name: 'Aliyah' }, { id: 5, name: 'Trevor' }, { id: 6, name: 'Karine' }]

router.get('/', ctx => {
    ctx.status = HttpStatus.OK
    ctx.body = USERS
})

module.exports = router
