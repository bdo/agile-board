import './TicketAssigneeEditor.css'

import PropTypes from 'prop-types'
import React, { memo } from 'react'

import Avatar from '../avatar/Avatar'

const TicketAssigneeEditor = ({ assignee, onDelete }) => (
    <div className="assignees-editor">
        <span className="delete-assignee icon-cross" onClick={onDelete} />
        <Avatar user={assignee} size={48} />
    </div>
)

TicketAssigneeEditor.propTypes = {
    assignee: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default memo(TicketAssigneeEditor)
