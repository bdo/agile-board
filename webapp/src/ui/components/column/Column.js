import './Column.css'

import PropTypes from 'prop-types'
import React, { useState } from 'react'

import TicketPlaceholder from '../ticket-placeholder/TicketPlaceholder'
import Ticket from '../ticket/Ticket'

const Column = ({ id, label, tickets, onSaveTicket, onDeleteTicket }) => {
    const [ticket, setTicket] = useState(null)
    return (
        <div id={id} className="column">
            <h1>{label}</h1>
            <div className="tickets">
                {tickets.map(ticket => (
                    <Ticket key={ticket.id} ticket={ticket} onSave={onSaveTicket} onDelete={onDeleteTicket} />
                ))}
                {ticket && <Ticket ticket={ticket} onStopEdition={setTicket.bind(this, null)} onSave={onSaveTicket} />}
                {id === 'to-do' && (
                    <TicketPlaceholder className="add-ticket" onClick={setTicket.bind(this, { id: null, state: 'to-do' })}>
                        +
                    </TicketPlaceholder>
                )}
            </div>
        </div>
    )
}
Column.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    tickets: PropTypes.array.isRequired,
    onSaveTicket: PropTypes.func.isRequired,
    onDeleteTicket: PropTypes.func.isRequired
}

export default Column
