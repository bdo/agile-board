const Router = require('koa-router')
const router = new Router()
const HttpStatus = require('http-status')

const { Op } = require('sequelize')

const { Ticket, User } = require('../db')

router.get('/', async ctx => {
    ctx.status = HttpStatus.OK
    ctx.body = await Ticket.findAll({ include: [{ model: User, as: 'assignees' }] })
})

router.get('/:id', async ctx => {
    const { id } = ctx.params
    ctx.status = HttpStatus.OK
    ctx.body = await Ticket.findByPk(id, { include: [User] })
})

router.post('/', async ctx => {
    const { points, type, state, summary, description, assignees } = ctx.request.body
    const ticket = await Ticket.create({ points, type, state, summary, description })
    const _assignees = await User.findAll({ where: { id: { [Op.in]: assignees.map(({ id }) => id) } } })
    await ticket.setAssignees(_assignees)
    ctx.status = HttpStatus.CREATED
    ctx.body = ticket.id
})

router.put('/:id', async ctx => {
    const { id } = ctx.params
    const { points, type, state, summary, description, assignees } = ctx.request.body
    const ticket = await Ticket.findByPk(id)
    await ticket.update({ points, type, state, summary, description })
    const _assignees = await User.findAll({ where: { id: { [Op.in]: assignees.map(({ id }) => id) } } })
    await ticket.setAssignees(_assignees)
    ctx.status = HttpStatus.NO_CONTENT
})

router.delete('/:id', async ctx => {
    const { id } = ctx.params
    const ticket = await Ticket.findByPk(id)
    await ticket.destroy()
    ctx.status = HttpStatus.NO_CONTENT
})

module.exports = router
