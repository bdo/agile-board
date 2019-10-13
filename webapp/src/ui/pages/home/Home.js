import './Home.css'

import React from 'react'

import TicketService from '../../../services/TicketService'
import Column from '../../components/column/Column'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { tickets: [] }
        this.columns = [
            { id: 'to-do', label: 'To do' },
            { id: 'in-progress', label: 'In progress' },
            { id: 'to-review', label: 'To review' },
            { id: 'to-test', label: 'To test' },
            { id: 'done', label: 'Done' }
        ]
    }

    async fetchTickets() {
        const tickets = await TicketService.list()
        this.setState({ tickets })
    }

    async saveTicket(ticket) {
        await TicketService.save(ticket)
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
        const { tickets } = this.state
        return (
            <section id="home">
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
            </section>
        )
    }
}

export default Home
