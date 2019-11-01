const Sequelize = require('sequelize')

const { Ticket, User } = require('../db')

const { _ticket } = require('../../fixtures/ticket')
const { _user } = require('../../fixtures/user')

const router = require('./index')

jest.spyOn(User, 'findAll').mockResolvedValue([_user])

jest.spyOn(Ticket, 'findAll').mockResolvedValue([_ticket])
jest.spyOn(Ticket, 'findByPk').mockResolvedValue(_ticket)
jest.spyOn(Ticket, 'create').mockResolvedValue(_ticket)
jest.spyOn(Ticket, 'update').mockResolvedValue(_ticket)
jest.spyOn(Ticket, 'destroy').mockResolvedValue(null)

describe('GET tickets', () => {
    let ctx
    beforeEach(() => {
        ctx = {}
    })

    it('should get tickets', async () => {
        ctx.query = {}
        const route = router.route('getTickets')
        await route.stack[0](ctx)
        expect(Ticket.findAll).toHaveBeenCalled()
        expect(ctx.status).toEqual(200)
        expect(ctx.body).toMatchObject([{ id: 1 }])
    })

    it('should get ticket', async () => {
        ctx.params = { id: 1 }
        const route = router.route('getTicket')
        await route.stack[0](ctx)
        expect(Ticket.findByPk).toHaveBeenCalled()
        expect(ctx.status).toEqual(200)
        expect(ctx.body).toMatchObject({ id: 1 })
    })

    it('should post ticket', async () => {
        ctx.request = { body: { summary: 'Ticket summary', assignees: [] } }
        const route = router.route('postTicket')
        await route.stack[0](ctx)
        expect(Ticket.create).toHaveBeenCalled()
        expect(ctx.status).toEqual(201)
        expect(ctx.body).toEqual(1)
    })

    it('should put ticket', async () => {
        ctx.params = { id: 1 }
        ctx.request = { body: { summary: 'Ticket summary', assignees: [] } }
        const route = router.route('putTicket')
        await route.stack[0](ctx)
        expect(_ticket.update).toHaveBeenCalled()
        expect(ctx.status).toEqual(204)
        expect(ctx.body).toBeUndefined()
    })

    it('should update tickets priority when ticket priority changes', async () => {
        ctx.params = { id: 1 }
        ctx.request = { body: { priority: 2, summary: 'Ticket summary', assignees: [] } }

        const route = router.route('putTicket')
        await route.stack[0](ctx)
        expect(Ticket.update).toHaveBeenCalledWith({ priority: Sequelize.literal('priority + -1') }, { where: { priority: { [Sequelize.Op.between]: [1, 2] } } })
    })

    it('should delete ticket', async () => {
        ctx.params = { id: 1 }
        const route = router.route('deleteTicket')
        await route.stack[0](ctx)
        expect(Ticket.destroy).toHaveBeenCalled()
        expect(ctx.status).toEqual(204)
        expect(ctx.body).toBeUndefined()
    })
})
