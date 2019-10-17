import './TicketType.css'

import PropTypes from 'prop-types'
import React, { memo } from 'react'

const TicketType = ({ editing, type, onChange }) => {
    if (!editing) return null
    return (
        <select className="type-editor" value={type} onChange={onChange}>
            <option value="story">US</option>
            <option value="bug">Bug</option>
            <option value="task">Task</option>
        </select>
    )
}

TicketType.propTypes = {
    editing: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(TicketType)
