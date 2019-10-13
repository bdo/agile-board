const Router = require('koa-router')
const router = new Router()

router.use('/api/tickets', require('./api/tickets').routes())
router.use('/api/users', require('./api/users').routes())

module.exports = router
