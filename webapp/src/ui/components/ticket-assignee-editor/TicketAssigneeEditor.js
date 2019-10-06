import './TicketAssigneeEditor.css'

import React, { memo } from 'react'

import PropTypes from 'prop-types'

const TicketAssigneeEditor = ({ assigneeId, onDelete }) => (
    <div className="assignees-editor">
        <span className="delete-assignee icon-cross" onClick={onDelete} />
        <img key={assigneeId} src={`/images/avatar/${assigneeId}.png`} alt={assigneeId} width={48} />
    </div>
)

TicketAssigneeEditor.propTypes = {
    assigneeId: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default memo(TicketAssigneeEditor)
