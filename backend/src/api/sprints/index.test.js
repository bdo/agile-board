const { Sprint } = require('../db')

const { _sprint } = require('../../fixtures/sprint')

const router = require('./index')

jest.spyOn(Sprint, 'findAll').mockResolvedValue([_sprint])
jest.spyOn(Sprint, 'update').mockResolvedValue(_sprint)

describe('GET sprints', () => {
    let ctx
    beforeEach(() => {
        ctx = {}
    })

    it('should get sprints', async () => {
        ctx.query = {}
        const route = router.route('getSprints')
        await route.stack[0](ctx)
        expect(Sprint.findAll).toHaveBeenCalled()
        expect(ctx.status).toEqual(200)
        expect(ctx.body).toMatchObject([{ id: 1 }])
    })

    it('should put sprint', async () => {
        ctx.params = { id: 1 }
        ctx.request = { body: { name: 'Sprint 1', state: 'open' } }
        const route = router.route('putSprint')
        await route.stack[0](ctx)
        expect(Sprint.update).toHaveBeenCalled()
        expect(ctx.status).toEqual(204)
        expect(ctx.body).toBeUndefined()
    })
})
