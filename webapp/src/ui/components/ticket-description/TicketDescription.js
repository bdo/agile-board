import './TicketDescription.css'

import { TextArea } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

const TicketDescription = ({ description, onChange }) => (
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

TicketDescription.propTypes = {
    description: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

TicketDescription.defaultProps = {
    description: ''
}

export default memo(TicketDescription)
