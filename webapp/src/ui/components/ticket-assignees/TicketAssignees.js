import './TicketAssignees.css'

import PropTypes from 'prop-types'
import React, { memo } from 'react'

import Avatar from '../avatar/Avatar'
import TicketAssigneeSelect from '../ticket-assignee-select/TicketAssigneeSelect'

const TicketAssignees = ({ editing, assignees, onAdd, onDelete }) => (
    <div className="assignees">
        {assignees.map(assignee => {
            if (!editing) return <Avatar key={assignee.id} user={assignee} size={24} />
            return (
                <div className="assignees-editor">
                    <span className="delete-assignee icon-cross" onClick={onDelete} />
                    <Avatar user={assignee} size={48} />
                </div>
            )
        })}
        {editing && <TicketAssigneeSelect assignees={assignees} onAdd={onAdd} />}
    </div>
)

TicketAssignees.propTypes = {
    editing: PropTypes.bool.isRequired,
    assignee: PropTypes.object.isRequired,
    onAdd: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default memo(TicketAssignees)
