import './Ticket.css'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDrag } from 'react-dnd'

import Avatar from '../avatar/Avatar'
import TicketEditor from '../ticket-editor/TicketEditor'

const Ticket = ({ ticket, onRefreshTickets }) => {
    const [editing, setEditing] = useState(false)

    const [{ dragging }, drag] = useDrag({
        item: { type: 'ticket', ticket },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })

    return (
        <React.Fragment>
            <div ref={drag} className={classnames('ticket', ticket.type, { dragging })} title={ticket.description} onClick={setEditing.bind(this, true)}>
                <div className="ticket-top">
                    <div className="assignees">
                        {ticket.assignees.map(assignee => (
                            <Avatar key={assignee.id} user={assignee} />
                        ))}
                    </div>
                    <div className="points">{ticket.points}</div>
                </div>
                <div className="ticket-bottom">
                    <div className="summary">{ticket.summary}</div>
                    {ticket.description}
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
