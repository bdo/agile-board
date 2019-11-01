import './TicketTile.css'

import { Card, Colors, H5, Icon, Tag } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import classnames from 'classnames'
import { PropTypes } from 'prop-types'
import React, { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd-cjs'

import TicketEditor from '../ticket-editor/TicketEditor'

const COLORS = { story: Colors.GOLD5, task: Colors.BLUE5, bug: Colors.RED5 }

const TicketTile = ({ ticket, onMoveTicket, onRefreshTickets }) => {
    const [editing, setEditing] = useState(false)

    const ref = useRef(null)

    const [{ isOver }, drop] = useDrop({
        accept: 'ticket',
        drop: item => onMoveTicket(item.ticket, ticket.priority, item.ticket.state),
        collect: monitor => ({ isOver: !!monitor.isOver() })
    })

    const [{ isDragging }, drag] = useDrag({
        item: { type: 'ticket', ticket },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    drag(drop(ref))

    return (
        <React.Fragment>
            <div ref={ref} className={classnames('ticket-tile-drag-drop', { dragging: isDragging, dropping: isOver })}>
                <Card props className="ticket-tile">
                    <div className="ticket-tile-left" style={{ backgroundColor: COLORS[ticket.type] }} />
                    <div className="ticket-tile-center">
                        <H5 title={ticket.summary}>{ticket.summary}</H5>
                        <p title={ticket.description}>{ticket.description}</p>
                    </div>
                    <div className="ticket-tile-right">
                        <div>
                            <Icon icon={IconNames.EDIT} iconSize={16} onClick={setEditing.bind(this, true)} className="icon" />
                        </div>
                        <Tag round minimal className="ticket-tile-points">
                            {ticket.points}
                        </Tag>
                    </div>
                </Card>
            </div>
            {editing && <TicketEditor ticket={ticket} onEndEditing={setEditing.bind(this, false)} onRefreshTickets={onRefreshTickets} />}
        </React.Fragment>
    )
}

TicketTile.propTypes = {
    ticket: PropTypes.object.isRequired,
    onMoveTicket: PropTypes.func.isRequired,
    onRefreshTickets: PropTypes.func.isRequired
}

export default TicketTile
