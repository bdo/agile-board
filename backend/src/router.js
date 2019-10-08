const Router = require('koa-router')
const router = new Router()

router.use('/api/tickets', require('./api/tickets').routes())

module.exports = router
