import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { PropTypes } from 'prop-types'
import React, { useCallback } from 'react'

import TicketService from '../../../services/TicketService'
import TicketTile, { TicketTileDrag, TicketTileDrop } from '../ticket-tile/TicketTile'

const SprintPanel = ({ sprint, onRefreshSprints }) => {
    const moveTicket = useCallback(
        (ticket, sprintId, priority) => {
            TicketService.save({ ...ticket, sprintId, priority }).then(onRefreshSprints)
        },
        [onRefreshSprints]
    )

    return (
        <Menu className="sprint-panel">
            <MenuItem className="description" icon={IconNames.WALK} text={sprint.description} />
            <MenuDivider />
            {sprint.tickets.map(ticket => (
                <TicketTileDrop key={ticket.id} priority={ticket.priority} sprintId={ticket.sprintId} onMoveTicket={moveTicket}>
                    <TicketTileDrag ticket={ticket}>
                        <TicketTile ticket={ticket} onRefreshTickets={onRefreshSprints} />
                    </TicketTileDrag>
                </TicketTileDrop>
            ))}
            <TicketTileDrop priority={sprint.tickets.length + 1} sprintId={sprint.id} onMoveTicket={moveTicket} />
        </Menu>
    )
}

SprintPanel.propTypes = {
    sprint: PropTypes.object.isRequired,
    onRefreshSprints: PropTypes.func.isRequired
}

export default SprintPanel
