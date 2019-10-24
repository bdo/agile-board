import './TicketSummary.css'

import { InputGroup } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

const TicketSummary = ({ summary, onChange }) => (
    <InputGroup className="ticket-summary-editor" value={summary} onChange={e => onChange('summary', e.target.value)} placeholder="Summary" />
)

TicketSummary.propTypes = {
    summary: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(TicketSummary)
