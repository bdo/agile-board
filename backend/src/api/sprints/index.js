const Router = require('koa-router')
const router = new Router()
const HttpStatus = require('http-status')

const { Sprint, Ticket } = require('../db')

router.get('getSprints', '/', async ctx => {
    const { projectId, state } = ctx.query
    ctx.status = HttpStatus.OK
    ctx.body = await Sprint.findAll({ where: { ...(projectId && { projectId }), ...(state && { state }) }, include: [Ticket], order: [['id', 'ASC'], [Ticket, 'priority', 'ASC']] })
})

module.exports = router
