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

module.exports = router
