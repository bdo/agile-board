const Router = require('koa-router')
const router = new Router()
const HttpStatus = require('http-status')

const { Project } = require('../db')

router.get('/', async ctx => {
    ctx.status = HttpStatus.OK
    ctx.body = await Project.findAll()
})

router.get('/:id', async ctx => {
    const { id } = ctx.params
    ctx.status = HttpStatus.OK
    ctx.body = await Project.findByPk(id)
})

router.post('/', async ctx => {
    const { name, description } = ctx.request.body
    const project = await Project.create({ archived: 0, name, description })
    ctx.status = HttpStatus.CREATED
    ctx.body = project.id
})

router.put('/:id', async ctx => {
    const { id } = ctx.params
    const { archived, name, description } = ctx.request.body
    await Project.update({ archived, name, description }, { where: { id } })
    ctx.status = HttpStatus.NO_CONTENT
})

module.exports = router
