const Sequelize = require('sequelize')
const { Op } = Sequelize

const { Ticket } = require('../db')

exports.update = async (oldTicket, newTicket) => {
    const { id } = oldTicket
    if (oldTicket.sprintId !== newTicket.sprintId) {
        // Update new sprint tickets priority
        await Ticket.update({ priority: Sequelize.literal('priority + 1') }, { where: { sprintId: newTicket.sprintId, priority: { [Op.gte]: newTicket.priority } } })
        // Update ticket sprint
        await Ticket.update({ sprintId: newTicket.sprintId }, { where: { id } })
        // Update old sprint tickets priority
        await Ticket.update({ priority: Sequelize.literal('priority - 1') }, { where: { sprintId: oldTicket.sprintId, priority: { [Op.gt]: oldTicket.priority } } })
    } else {
        const translate = oldTicket.priority < newTicket.priority ? 'priority - 1' : 'priority + 1'
        const minPriority = Math.min(oldTicket.priority, newTicket.priority)
        const maxPriority = Math.max(oldTicket.priority, newTicket.priority)
        // Update tickets priority between old and new ticket priority
        await Ticket.update({ priority: Sequelize.literal(translate) }, { where: { sprintId: newTicket.sprintId, priority: { [Op.between]: [minPriority, maxPriority] } } })
    }
    // Update ticket priority
    await Ticket.update({ priority: newTicket.priority }, { where: { id } })

    return Ticket.findByPk(id)
}
