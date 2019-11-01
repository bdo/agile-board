import './TicketDescriptionEditor.css'

import { TextArea } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

const TicketDescriptionEditor = ({ description, onChange }) => (
    <TextArea
        className="ticket-description-editor"
        value={description}
        onChange={e => onChange('description', e.target.value)}
        placeholder="Description"
        rows={5}
        fill
        growVertically={false}
    />
)

TicketDescriptionEditor.propTypes = {
    description: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

TicketDescriptionEditor.defaultProps = {
    description: ''
}

export default memo(TicketDescriptionEditor)
