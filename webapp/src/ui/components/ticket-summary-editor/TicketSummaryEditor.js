import './TicketSummaryEditor.css'

import PropTypes from 'prop-types'
import React, { memo } from 'react'

const TicketSummaryEditor = ({ summary, onChange }) => <textarea className="summary-editor" value={summary} onChange={onChange} />
TicketSummaryEditor.propTypes = {
    summary: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(TicketSummaryEditor)
