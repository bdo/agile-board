const { Ticket, User } = require('../db')

const { _ticket } = require('../../fixtures/ticket')
const { _user } = require('../../fixtures/user')

const router = require('./index')

const priority = require('./priority')

jest.spyOn(User, 'findAll').mockResolvedValue([_user])

jest.spyOn(Ticket, 'findAll').mockResolvedValue([_ticket])
jest.spyOn(Ticket, 'findByPk').mockResolvedValue(_ticket)
jest.spyOn(Ticket, 'create').mockResolvedValue(_ticket)
jest.spyOn(Ticket, 'destroy').mockResolvedValue(null)

jest.spyOn(priority, 'update').mockResolvedValue(_ticket)

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

    it('should set assignees on ticket creation', async () => {
        ctx.params = { id: 1 }
        ctx.request = { body: { summary: 'Ticket summary', assignees: [] } }
        const route = router.route('postTicket')
        await route.stack[0](ctx)
        expect(_ticket.setAssignees).toHaveBeenCalled()
    })

    it('should put ticket', async () => {
        ctx.params = { id: 1 }
        ctx.request = { body: { summary: 'Ticket summary', assignees: [] } }
        const route = router.route('putTicket')
        await route.stack[0](ctx)
        expect(priority.update).toHaveBeenCalled()
        expect(ctx.status).toEqual(204)
        expect(ctx.body).toBeUndefined()
    })

    it('should set assignees on ticket modification', async () => {
        ctx.params = { id: 1 }
        ctx.request = { body: { summary: 'Ticket summary', assignees: [] } }
        const route = router.route('putTicket')
        await route.stack[0](ctx)
        expect(_ticket.setAssignees).toHaveBeenCalled()
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
