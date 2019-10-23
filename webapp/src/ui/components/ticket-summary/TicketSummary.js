import './TicketSummary.css'

import { InputGroup } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

const TicketSummary = ({ editing, summary, onChange }) => {
    if (!editing) return <div className="summary">{summary}</div>
    return <InputGroup className="ticket-summary-editor" value={summary} onChange={onChange} placeholder="Summary" />
}

TicketSummary.propTypes = {
    editing: PropTypes.bool.isRequired,
    summary: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(TicketSummary)
