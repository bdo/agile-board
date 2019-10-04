import PropTypes from 'prop-types'
import React, { memo } from 'react'

const TicketAssigneeEditor = ({ assigneeId, onDelete }) => <img key={assigneeId} src={`/images/avatar/${assigneeId}.png`} alt={assigneeId} width={48} />
TicketAssigneeEditor.propTypes = {
    assigneeId: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default memo(TicketAssigneeEditor)
