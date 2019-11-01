const { User } = require('../db')

const { _user } = require('../../fixtures/user')

const router = require('./index')

describe('GET users', () => {
    let ctx
    beforeEach(() => {
        ctx = {}

        jest.spyOn(User, 'findAll').mockResolvedValue([_user])
    })

    it('should get users', async () => {
        ctx.query = {}
        const route = router.route('getUsers')
        await route.stack[0](ctx)
        expect(User.findAll).toHaveBeenCalled()
        expect(ctx.status).toEqual(200)
        expect(ctx.body).toMatchObject([{ id: 1 }])
    })
})
