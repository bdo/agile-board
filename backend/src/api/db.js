const Sequelize = require('sequelize')

const config = require('../config')

const connection = new Sequelize(config.DATABASE.NAME, config.DATABASE.USER, config.DATABASE.PASS, {
    logging: config.ENVIRONMENT === 'development' && console.log,
    host: config.DATABASE.HOST,
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
        priority: { type: Sequelize.TINYINT },
        type: { type: Sequelize.STRING },
        state: { type: Sequelize.STRING },
        summary: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING }
    },
    { tableName: 'ticket' }
)

const Project = connection.define(
    'project',
    {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        archived: { type: Sequelize.BOOLEAN },
        name: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING }
    },
    { tableName: 'project' }
)

const Sprint = connection.define(
    'sprint',
    {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        state: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING }
    },
    { tableName: 'sprint' }
)

const TicketAssignee = connection.define(
    'ticket_assignee',
    {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        ticketId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    },
    {
        tableName: 'ticket_assignee'
    }
)

Sprint.hasMany(Ticket, { foreignKey: 'sprintId' })

User.belongsToMany(Ticket, { as: 'tickets', through: TicketAssignee, foreignKey: 'userId' })
Ticket.belongsToMany(User, { as: 'assignees', through: TicketAssignee, foreignKey: 'ticketId' })

module.exports = { User, Ticket, Project, Sprint }
