const { Sprint } = require('../db')

const { _sprint } = require('../../fixtures/sprint')

const router = require('./index')

jest.spyOn(Sprint, 'findAll').mockResolvedValue([_sprint])

describe('GET sprints', () => {
    let ctx
    beforeEach(() => {
        ctx = {}
    })

    it('should get users', async () => {
        ctx.query = {}
        const route = router.route('getSprints')
        await route.stack[0](ctx)
        expect(Sprint.findAll).toHaveBeenCalled()
        expect(ctx.status).toEqual(200)
        expect(ctx.body).toMatchObject([{ id: 1 }])
    })
})
