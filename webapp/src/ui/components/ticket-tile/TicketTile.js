import './TicketTile.css'

import { Card, Classes, Colors, Tag } from '@blueprintjs/core'
import classnames from 'classnames'
import { PropTypes } from 'prop-types'
import React, { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd-cjs'

import TicketEditor from '../ticket-editor/TicketEditor'

const COLORS = { story: Colors.GOLD5, task: Colors.BLUE5, bug: Colors.RED5 }

export const TicketTileDrop = ({ sprintId, priority, onMoveTicket, children }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'ticket',
        drop: item => onMoveTicket(item.ticket, sprintId, priority),
        collect: monitor => ({ isOver: !!monitor.isOver() })
    })

    return (
        <div ref={drop} className={classnames('ticket-tile-drop', { dropping: isOver })}>
            {children}
        </div>
    )
}

TicketTileDrop.propTypes = {
    sprintId: PropTypes.number.isRequired,
    priority: PropTypes.number.isRequired,
    onMoveTicket: PropTypes.func.isRequired
}

export const TicketTileDrag = ({ ticket, children }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'ticket', ticket },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
        <div ref={drag} className={classnames('ticket-tile-drag', { dragging: isDragging })}>
            {children}
        </div>
    )
}

TicketTileDrag.propTypes = {
    ticket: PropTypes.object.isRequired
}

const TicketTile = ({ ticket, onRefreshTickets }) => {
    const [editing, setEditing] = useState(false)

    return (
        <React.Fragment>
            <Card className="ticket-tile" interactive onClick={setEditing.bind(this, true)}>
                <div className="left" style={{ backgroundColor: COLORS[ticket.type] }} />
                <div className="center">
                    <div className={classnames(Classes.TEXT_OVERFLOW_ELLIPSIS, 'summary')} title={ticket.summary}>
                        <b>{ticket.summary}</b>
                    </div>
                    <div className={classnames(Classes.TEXT_OVERFLOW_ELLIPSIS, 'description')} title={ticket.description}>
                        {ticket.description}
                    </div>
                </div>
                <div className="right">
                    <Tag round minimal className="points">
                        {ticket.points}
                    </Tag>
                </div>
            </Card>
            {editing && <TicketEditor ticket={ticket} onEndEditing={setEditing.bind(this, false)} onRefreshTickets={onRefreshTickets} />}
        </React.Fragment>
    )
}

TicketTile.propTypes = {
    ticket: PropTypes.object.isRequired,
    onRefreshTickets: PropTypes.func.isRequired
}

export default TicketTile
