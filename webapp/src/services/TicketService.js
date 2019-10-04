// To be replaced with real API calls
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

class TicketService {
    static async list() {
        return TICKETS
    }

    static async get(id) {
        return TICKETS_DETAIL[id]
    }

    static async save(ticket) {
        if (!ticket.id) ticket.id = TICKETS.length
        TICKETS_DETAIL[ticket.id] = ticket
    }

    static async delete(id) {
        TICKETS.splice(TICKETS.findIndex(ticket => ticket.id === id), 1)
        delete TICKETS_DETAIL[id]
    }
}

export default TicketService
