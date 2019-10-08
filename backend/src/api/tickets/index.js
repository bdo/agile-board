const Router = require('koa-router')
const router = new Router()
const HttpStatus = require('http-status')

// To be replaced with real database
const TICKETS = [
    { id: 1, state: 'to-do' },
    { id: 2, state: 'to-do' },
    { id: 3, state: 'in-progress' },
    { id: 4, state: 'to-review' },
    { id: 5, state: 'to-test' },
    { id: 6, state: 'done' }
]
const TICKETS_DETAIL = {
    1: { id: 1, state: 'to-do', type: 'story', summary: 'Do something', sp: 5, assignees: [1, 2] },
    2: { id: 2, state: 'to-do', type: 'bug', summary: 'Fix something', sp: 0, assignees: [1] },
    3: {
        id: 3,
        state: 'in-progress',
        type: 'task',
        summary:
            "It's a very long task summary, because our PO loves to talk and talk and talk again, it's very annoying. I don't like it at all. Fortunately there are scrollbars, weehoo!",
        sp: 2,
        assignees: [3]
    },
    4: { id: 4, state: 'to-review', type: 'bug', summary: 'Fix something', sp: 0, assignees: [4] },
    5: { id: 5, state: 'to-test', type: 'task', summary: 'Do something', sp: 2, assignees: [3] },
    6: { id: 6, state: 'done', type: 'bug', summary: 'Fix something', sp: 0, assignees: [2] }
}

router.get('/', ctx => {
    ctx.status = HttpStatus.OK
    ctx.body = TICKETS
})

router.get('/:id', ctx => {
    const { id } = ctx.params
    ctx.status = HttpStatus.OK
    ctx.body = TICKETS_DETAIL[+id]
})

router.post('/', ctx => {
    const ticket = ctx.body
    ticket.id = TICKETS.length
    TICKETS_DETAIL[ticket.id] = ticket
    ctx.status = HttpStatus.CREATED
    ctx.body = ticket.id
})

router.put('/:id', ctx => {
    const { id } = ctx.params
    const ticket = ctx.body
    TICKETS_DETAIL[+id] = ticket
    ctx.status = HttpStatus.NO_CONTENT
})

router.delete('/:id', ctx => {
    const { id } = ctx.params
    TICKETS.splice(TICKETS.findIndex(ticket => ticket.id === +id), 1)
    delete TICKETS_DETAIL[id]
    ctx.status = HttpStatus.NO_CONTENT
})

module.exports = router
