import './TicketButtonBar.css'

import PropTypes from 'prop-types'
import React from 'react'

const TicketButtonBar = ({ editing, onDelete }) => {
    if (!editing) return null
    return (
        <div className="button-bar">
            <button type="submit" className="save">
                <div className="icon-checkmark" />
            </button>
            <button type="button" className="delete" onClick={onDelete}>
                <div className="icon-cross" />
            </button>
        </div>
    )
}

TicketButtonBar.propTypes = {
    editing: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default TicketButtonBar
