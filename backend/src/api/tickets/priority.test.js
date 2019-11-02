const Sequelize = require('sequelize')

const { Ticket } = require('../db')

const { _ticket } = require('../../fixtures/ticket')

const priority = require('./priority')

jest.spyOn(Ticket, 'findByPk').mockResolvedValue(_ticket)
jest.spyOn(Ticket, 'update').mockResolvedValue()

describe('GET tickets', () => {
    it('should update ticket priority when sprint did not change', async () => {
        const oldTicket = { ..._ticket, id: 1, sprintId: 1, priority: 1 }
        const newTicket = { ..._ticket, id: 1, sprintId: 1, priority: 2 }
        await priority.update(oldTicket, newTicket)
        expect(Ticket.update).toHaveBeenNthCalledWith(1, { priority: Sequelize.literal('priority - 1') }, { where: { sprintId: 1, priority: { [Sequelize.Op.between]: [1, 2] } } })
        expect(Ticket.update).toHaveBeenNthCalledWith(2, { priority: 2 }, { where: { id: 1 } })
    })
})
