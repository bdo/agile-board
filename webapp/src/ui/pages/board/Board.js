import './Board.css'

import React from 'react'
import { withRouter } from 'react-router'

import ProjectService from '../../../services/ProjectService'
import TicketService from '../../../services/TicketService'
import Column from '../../components/column/Column'
import Header from '../../components/header/Header'

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = { projectName: '', tickets: [] }
        this.columns = [
            { id: 'to-do', label: 'To do' },
            { id: 'in-progress', label: 'In progress' },
            { id: 'to-review', label: 'To review' },
            { id: 'to-test', label: 'To test' },
            { id: 'done', label: 'Done' }
        ]
    }

    async fetchTickets() {
        const { projectId } = this.props.match.params
        const project = await ProjectService.get(projectId)
        const tickets = await TicketService.list({ projectId })
        this.setState({ projectName: project.name, tickets })
    }

    async saveTicket(ticket) {
        const { projectId } = this.props.match.params
        await TicketService.save({ ...ticket, projectId })
        this.fetchTickets()
    }

    async deleteTicket(id) {
        await TicketService.delete(id)
        this.fetchTickets()
    }

    componentDidMount() {
        this.fetchTickets()
    }

    render() {
        const { projectName, tickets } = this.state
        return (
            <section id="board">
                <Header projectName={projectName} />
                <div className="columns">
                    {this.columns.map(({ id, label }) => (
                        <Column
                            id={id}
                            key={id}
                            label={label}
                            tickets={tickets.filter(ticket => ticket.state === id)}
                            onSaveTicket={this.saveTicket.bind(this)}
                            onDeleteTicket={this.deleteTicket.bind(this)}
                        />
                    ))}
                </div>
            </section>
        )
    }
}

export default withRouter(Board)
