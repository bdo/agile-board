const Router = require('koa-router')
const router = new Router()
const HttpStatus = require('http-status')

const Sequelize = require('sequelize')
const { Op } = Sequelize

const { Ticket, User } = require('../db')

router.get('/', async ctx => {
    const { projectId } = ctx.query
    ctx.status = HttpStatus.OK
    ctx.body = await Ticket.findAll({ where: { projectId }, include: [{ model: User, as: 'assignees' }], order: [['priority', 'ASC']] })
})

router.get('/:id', async ctx => {
    const { id } = ctx.params
    ctx.status = HttpStatus.OK
    ctx.body = await Ticket.findByPk(id, { include: [{ model: User, as: 'assignees' }] })
})

router.post('/', async ctx => {
    const { points, type, state, summary, description, assignees, projectId } = ctx.request.body
    const tickets = await Ticket.findAll()
    const ticket = await Ticket.create({ points, priority: tickets.length + 1, type, state, summary, description, projectId })
    const _assignees = await User.findAll({ where: { id: { [Op.in]: assignees.map(({ id }) => id) } } })
    await ticket.setAssignees(_assignees)
    ctx.status = HttpStatus.CREATED
    ctx.body = ticket.id
})

router.put('/:id', async ctx => {
    const { id } = ctx.params
    const { points, priority, type, state, summary, description, assignees } = ctx.request.body
    const ticket = await Ticket.findByPk(id)
    if (ticket.priority !== priority) {
        const translate = ticket.priority < priority ? -1 : 1
        const minPriority = Math.min(ticket.priority, priority)
        const maxPriority = Math.max(ticket.priority, priority)
        await Ticket.update({ priority: Sequelize.literal(`priority + ${translate}`) }, { where: { priority: { [Op.between]: [minPriority, maxPriority] } } })
    }
    await ticket.update({ points, priority, type, state, summary, description })
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
