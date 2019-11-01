import './TicketTile.css'

import { Card, Colors, Elevation, H5, Tag } from '@blueprintjs/core'
import { PropTypes } from 'prop-types'
import React from 'react'

const COLORS = { story: Colors.GOLD5, task: Colors.BLUE5, bug: Colors.RED5 }

const TicketTile = ({ ticket }) => {
    return (
        <Card className="ticket-tile" elevation={Elevation.TWO}>
            <div className="ticket-tile-left" style={{ backgroundColor: COLORS[ticket.type] }} />
            <div className="ticket-tile-center">
                <H5 title={ticket.summary}>{ticket.summary}</H5>
                <p title={ticket.description}>{ticket.description}</p>
            </div>
            <div className="ticket-tile-right">
                <Tag round minimal className="ticket-tile-points">
                    {ticket.points}
                </Tag>
            </div>
        </Card>
    )
}

TicketTile.propTypes = {
    ticket: PropTypes.object.isRequired
}

export default TicketTile
