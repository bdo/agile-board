import './TicketDescription.css'

import PropTypes from 'prop-types'
import React, { memo } from 'react'

const TicketDescription = ({ editing, description, onChange }) => {
    if (!editing) return null
    return <textarea className="description-editor" value={description} onChange={onChange} />
}

TicketDescription.propTypes = {
    editing: PropTypes.bool.isRequired,
    description: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

TicketDescription.defaultProps = {
    description: ''
}

export default memo(TicketDescription)
