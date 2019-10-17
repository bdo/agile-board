import './TicketSummary.css'

import PropTypes from 'prop-types'
import React, { memo } from 'react'

const TicketSummary = ({ editing, summary, onChange }) => {
    if (!editing) return <div className="summary">{summary}</div>
    return <textarea className="summary-editor" value={summary} onChange={onChange} />
}

TicketSummary.propTypes = {
    editing: PropTypes.bool.isRequired,
    summary: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(TicketSummary)
