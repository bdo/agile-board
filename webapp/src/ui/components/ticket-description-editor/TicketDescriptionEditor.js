import './TicketDescriptionEditor.css'

import PropTypes from 'prop-types'
import React, { memo } from 'react'

const TicketDescriptionEditor = ({ description, onChange }) => <textarea className="description-editor" value={description} onChange={onChange} />
TicketDescriptionEditor.propTypes = {
    description: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(TicketDescriptionEditor)
