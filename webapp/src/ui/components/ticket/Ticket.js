import './Ticket.css'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDrag } from 'react-dnd-cjs'

import TicketAssignees from '../ticket-assignees/TicketAssignees'
import TicketEditor from '../ticket-editor/TicketEditor'

const Ticket = ({ ticket, onRefreshTickets }) => {
    const [editing, setEditing] = useState(false)

    const [{ isDragging }, drag] = useDrag({
        item: { type: 'ticket', ticket },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })

    return (
        <React.Fragment>
            <div ref={drag} className={classnames('ticket', ticket.type, { dragging: isDragging })} title={ticket.description} onClick={setEditing.bind(this, true)}>
                <div className="ticket-top">
                    <TicketAssignees assignees={ticket.assignees} />
                    <div className="points">{ticket.points}</div>
                </div>
                <div className="ticket-bottom">
                    <div className="summary">{ticket.summary}</div>
                </div>
            </div>
            {editing && <TicketEditor ticket={ticket} onEndEditing={setEditing.bind(this, false)} onRefreshTickets={onRefreshTickets} />}
        </React.Fragment>
    )
}

Ticket.propTypes = {
    ticket: PropTypes.object.isRequired,
    onRefreshTickets: PropTypes.func.isRequired
}

export default Ticket
