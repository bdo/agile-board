const Router = require('koa-router')
const router = new Router()
const HttpStatus = require('http-status')

// To be replaced with real database
const TICKETS = [
    { id: 1, state: 'to-do', type: 'story', summary: 'Do something', points: 5, assignees: [1, 2] },
    { id: 2, state: 'to-do', type: 'bug', summary: 'Fix something', points: 0, assignees: [1] },
    {
        id: 3,
        state: 'in-progress',
        type: 'task',
        summary:
            'It is a very long task summary, because our PO loves to talk and talk and talk again, it is very annoying. I do not like it at all. Fortunately there are scrollbars, weehoo!',
        points: 2,
        assignees: [3]
    },
    { id: 4, state: 'to-review', type: 'bug', summary: 'Fix something', points: 0, assignees: [4] },
    { id: 5, state: 'to-test', type: 'task', summary: 'Do something', points: 2, assignees: [3] },
    { id: 6, state: 'done', type: 'bug', summary: 'Fix something', points: 0, assignees: [2] }
]

router.get('/', ctx => {
    ctx.status = HttpStatus.OK
    ctx.body = TICKETS
})

router.get('/:id', ctx => {
    const { id } = ctx.params
    ctx.status = HttpStatus.OK
    ctx.body = TICKETS.find(ticket => ticket.id === +id)
})

router.post('/', ctx => {
    const { ticket } = ctx.request.body
    ticket.id = TICKETS.length + 1
    TICKETS.push(ticket)
    ctx.status = HttpStatus.CREATED
    ctx.body = ticket.id
})

router.put('/:id', ctx => {
    const { id } = ctx.params
    const { ticket } = ctx.request.body
    const index = TICKETS.findIndex(ticket => ticket.id === +id)
    TICKETS[index] = { id, ...ticket }
    ctx.status = HttpStatus.NO_CONTENT
})

router.delete('/:id', ctx => {
    const { id } = ctx.params
    const index = TICKETS.findIndex(ticket => ticket.id === +id)
    TICKETS.splice(index, 1)
    ctx.status = HttpStatus.NO_CONTENT
})

module.exports = router
