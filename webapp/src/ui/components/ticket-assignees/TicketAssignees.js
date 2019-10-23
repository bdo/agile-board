import './TicketAssignees.css'

import PropTypes from 'prop-types'
import React, { memo } from 'react'

import Avatar from '../avatar/Avatar'
import TicketAssigneesSelect from '../ticket-assignees-select/TicketAssigneesSelect'

const TicketAssignees = ({ editing, assignees, onChange }) => {
    if (!editing)
        return (
            <div className="assignees">
                {assignees.map(assignee => (
                    <Avatar key={assignee.id} user={assignee} />
                ))}
            </div>
        )
    return <TicketAssigneesSelect assignees={assignees} onChange={onChange} />
}

TicketAssignees.propTypes = {
    editing: PropTypes.bool.isRequired,
    assignees: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(TicketAssignees)
