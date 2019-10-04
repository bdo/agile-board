import './Ticket.css'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import TicketService from '../../../services/TicketService'

class Ticket extends React.Component {
    static propTypes = {}

    constructor(props) {
        super(props)

        this.state = { ticket: null }
    }

    async componentDidMount() {
        const { id } = this.props
        const ticket = await TicketService.get(id)
        this.setState({ ticket })
    }

    render() {
        const { ticket } = this.state
        if (!ticket) return null
        return (
            <div className={classnames('ticket', ticket.type)}>
                <div className="ticket-top">
                    <div className="assignees">
                        {ticket.assignees.map(id => (
                            <img key={id} src={`/images/avatar/${id}.png`} alt={id} width={24} />
                        ))}
                    </div>
                    <div className="points">{ticket.sp}</div>
                </div>
                <div className="ticket-bottom">{ticket.summary}</div>
            </div>
        )
    }
}
Ticket.propTypes = {
    id: PropTypes.number
}

export default Ticket
