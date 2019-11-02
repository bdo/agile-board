const Router = require('koa-router')
const router = new Router()
const HttpStatus = require('http-status')

const Sequelize = require('sequelize')
const { Op } = Sequelize

const { Ticket, User } = require('../db')

const priority = require('./priority')

router.get('getTickets', '/', async ctx => {
    const { sprintId = null } = ctx.query
    ctx.status = HttpStatus.OK
    ctx.body = await Ticket.findAll({
        where: { sprintId },
        include: [{ model: User, as: 'assignees' }],
        order: [['priority', 'ASC'], ['sprintId', 'ASC']]
    })
})

router.get('getTicket', '/:id', async ctx => {
    const { id } = ctx.params
    ctx.status = HttpStatus.OK
    ctx.body = await Ticket.findByPk(id, { include: [{ model: User, as: 'assignees' }] })
})

router.post('postTicket', '/', async ctx => {
    const { points, type, state, summary, description, assignees, projectId } = ctx.request.body
    const tickets = await Ticket.findAll()
    const ticket = await Ticket.create({ points, priority: tickets.length + 1, type, state, summary, description, projectId })
    const _assignees = await User.findAll({ where: { id: { [Op.in]: assignees.map(({ id }) => id) } } })
    await ticket.setAssignees(_assignees)
    ctx.status = HttpStatus.CREATED
    ctx.body = ticket.id
})

router.put('putTicket', '/:id', async ctx => {
    const { id } = ctx.params
    const { assignees, ...newTicket } = ctx.request.body
    const oldTicket = await Ticket.findByPk(id)
    const ticket = await priority.update(oldTicket, newTicket)
    if (assignees) {
        const _assignees = await User.findAll({ where: { id: { [Op.in]: assignees.map(({ id }) => id) } } })
        await ticket.setAssignees(_assignees)
    }
    ctx.status = HttpStatus.NO_CONTENT
})

router.delete('deleteTicket', '/:id', async ctx => {
    const { id } = ctx.params
    await Ticket.destroy({ where: { id } })
    ctx.status = HttpStatus.NO_CONTENT
})

module.exports = router
