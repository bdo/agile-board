const Sequelize = require('sequelize')

const connection = new Sequelize('agile-board', 'root', 'root', {
    logging: console.log,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})

const User = connection.define(
    'user',
    {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING }
    },
    { tableName: 'user' }
)

const Ticket = connection.define(
    'ticket',
    {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        points: { type: Sequelize.TINYINT },
        type: { type: Sequelize.STRING },
        state: { type: Sequelize.STRING },
        summary: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING }
    },
    { tableName: 'ticket' }
)

const TicketAssignee = connection.define(
    'ticket_assignee',
    {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        ticket_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    },
    {
        tableName: 'ticket_assignee'
    }
)

User.belongsToMany(Ticket, { as: 'tickets', through: TicketAssignee, foreignKey: 'user_id' })
Ticket.belongsToMany(User, { as: 'assignees', through: TicketAssignee, foreignKey: 'ticket_id' })

module.exports = { User, Ticket }
