const { Project } = require('../db')

const { _project } = require('../../fixtures/project')

const router = require('./index')

describe('GET projects', () => {
    let ctx
    beforeEach(() => {
        ctx = {}

        jest.spyOn(Project, 'findAll').mockResolvedValue([_project])
        jest.spyOn(Project, 'findByPk').mockResolvedValue(_project)
        jest.spyOn(Project, 'create').mockResolvedValue(_project)
        jest.spyOn(Project, 'update').mockResolvedValue(_project)
    })

    it('should get projects', async () => {
        const route = router.route('getProjects')
        await route.stack[0](ctx)
        expect(Project.findAll).toHaveBeenCalled()
        expect(ctx.status).toEqual(200)
        expect(ctx.body).toMatchObject([{ id: 1 }])
    })

    it('should get project', async () => {
        ctx.params = { id: 1 }
        const route = router.route('getProject')
        await route.stack[0](ctx)
        expect(Project.findByPk).toHaveBeenCalled()
        expect(ctx.status).toEqual(200)
        expect(ctx.body).toMatchObject({ id: 1 })
    })

    it('should post project', async () => {
        ctx.request = { body: { name: 'Project name' } }
        const route = router.route('postProject')
        await route.stack[0](ctx)
        expect(Project.create).toHaveBeenCalled()
        expect(ctx.status).toEqual(201)
        expect(ctx.body).toEqual(1)
    })

    it('should put project', async () => {
        ctx.params = { id: 1 }
        ctx.request = { body: { name: 'Project name' } }
        const route = router.route('putProject')
        await route.stack[0](ctx)
        expect(Project.update).toHaveBeenCalled()
        expect(ctx.status).toEqual(204)
        expect(ctx.body).toBeUndefined()
    })
})
