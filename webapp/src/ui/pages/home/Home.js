import './Home.css'

import PropTypes from 'prop-types'
import React from 'react'

import TicketService from '../../../services/TicketService'
import Ticket from '../../components/ticket/Ticket'

const Column = ({ id, label, tickets, onDelete }) => (
    <div id={id} className="column">
        <h1>{label}</h1>
        <div className="tickets">
            {tickets.map(({ id }) => (
                <Ticket key={id} id={id} onDelete={onDelete} />
            ))}
        </div>
    </div>
)
Column.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    tickets: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
}

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

    async onDeleteTicket(id) {
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
                    <Column id={id} key={id} label={label} tickets={tickets.filter(ticket => ticket.state === id)} onDelete={this.onDeleteTicket.bind(this)} />
                ))}
            </section>
        )
    }
}

export default Home
