import './TicketAssignees.css'

import PropTypes from 'prop-types'
import React from 'react'

import Avatar from '../avatar/Avatar'

const TicketAssignees = ({ assignees }) => (
    <div className="assignees">
        {assignees.map(assignee => (
            <Avatar key={assignee.id} user={assignee} />
        ))}
    </div>
)

TicketAssignees.propTypes = {
    assignees: PropTypes.array.isRequired
}

export default TicketAssignees
