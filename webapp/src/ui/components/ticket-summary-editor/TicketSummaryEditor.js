import './TicketSummaryEditor.css'

import { InputGroup } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

const TicketSummaryEditor = ({ summary, onChange }) => (
    <InputGroup className="ticket-summary-editor" value={summary} onChange={e => onChange('summary', e.target.value)} placeholder="Summary" />
)

TicketSummaryEditor.propTypes = {
    summary: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(TicketSummaryEditor)
