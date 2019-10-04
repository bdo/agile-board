import './TicketButtonBar.css'

import PropTypes from 'prop-types'
import React from 'react'

const TicketButtonBar = ({ onSave, onDelete }) => (
    <div className="button-bar">
        <button className="save" onClick={onSave}>
            <div className="icon-checkmark" />
        </button>
        <button className="delete" onClick={onDelete}>
            <div className="icon-bin" />
        </button>
    </div>
)

TicketButtonBar.propTypes = {
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default TicketButtonBar
