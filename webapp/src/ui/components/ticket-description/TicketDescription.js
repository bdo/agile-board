import './TicketDescription.css'

import { TextArea } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

const TicketDescription = ({ editing, description, onChange }) => {
    if (!editing) return null
    return <TextArea className="ticket-description-editor" value={description} onChange={onChange} placeholder="Description" rows={5} fill growVertically={false} />
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
