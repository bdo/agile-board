import './Home.css'

import React from 'react'

import TicketService from '../../../services/TicketService'
import Ticket from '../../components/ticket/Ticket'

const Column = ({ id, label, tickets }) => (
    <div id={id} className="column">
        <h1>{label}</h1>
        <div className="tickets">
            {tickets.map(({ id }) => (
                <Ticket key={id} id={id} />
            ))}
        </div>
    </div>
)

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

    async componentDidMount() {
        const tickets = await TicketService.list()
        this.setState({ tickets })
    }

    render() {
        const { tickets } = this.state
        return (
            <section id="home">
                {this.columns.map(({ id, label }) => (
                    <Column id={id} key={id} label={label} tickets={tickets.filter(ticket => ticket.state === id)} />
                ))}
            </section>
        )
    }
}

export default Home
