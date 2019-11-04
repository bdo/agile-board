import { Icon, Menu, MenuDivider, MenuItem } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { PropTypes } from 'prop-types'
import React, { useCallback, useState } from 'react'

import SprintService from '../../../services/SprintService'
import TicketService from '../../../services/TicketService'
import SprintForm from '../sprint-form/SprintForm'
import TicketTile, { TicketTileDrag, TicketTileDrop } from '../ticket-tile/TicketTile'

const SprintPanel = ({ sprint, onRefreshSprints }) => {
    const [activateSprint, setActivateSprint] = useState(false)

    const moveTicket = useCallback(
        (ticket, sprintId, priority) => {
            TicketService.save({ ...ticket, sprintId, priority }).then(onRefreshSprints)
        },
        [onRefreshSprints]
    )

    const onSave = useCallback(
        sprint => {
            SprintService.save(sprint)
                .then(onRefreshSprints)
                .then(setActivateSprint.bind(this, false))
        },
        [onRefreshSprints]
    )

    const disabled = sprint.name === 'Backlog'
    const onSprintClick = disabled ? null : setActivateSprint.bind(this, true)
    const editIcon = disabled ? null : <Icon icon={IconNames.EDIT} />

    return (
        <React.Fragment>
            <Menu className="sprint-panel">
                <MenuItem
                    className="name"
                    active={sprint.state === 'active'}
                    disabled={disabled}
                    icon={IconNames.WALK}
                    text={sprint.name}
                    onClick={onSprintClick}
                    labelElement={editIcon}
                />
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
            {activateSprint && <SprintForm sprint={sprint} onClose={setActivateSprint.bind(this, false)} onSave={onSave} />}
        </React.Fragment>
    )
}

SprintPanel.propTypes = {
    sprint: PropTypes.object.isRequired,
    onRefreshSprints: PropTypes.func.isRequired
}

export default SprintPanel
