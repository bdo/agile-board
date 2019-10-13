import './Home.css'

import React from 'react'

import TicketService from '../../../services/TicketService'
import Column from '../../components/column/Column'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { tickets: [], openTicketEditor: false }
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

    async onSaveTicket(ticket) {
        await TicketService.save(ticket)
        this.fetchTickets()
    }

    async onDeleteTicket(id) {
        await TicketService.delete(id)
        this.fetchTickets()
    }

    onAddTicket() {
        const { tickets } = this.state
        this.setState({ tickets: [...tickets, { id: null, state: 'to-do' }] })
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
                        onSaveTicket={this.onSaveTicket.bind(this)}
                        onDeleteTicket={this.onDeleteTicket.bind(this)}
                        onAdd={this.onAddTicket.bind(this)}
                    />
                ))}
            </section>
        )
    }
}

export default Home
