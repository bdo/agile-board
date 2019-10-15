import './TicketPointsEditor.css'

import PropTypes from 'prop-types'
import React, { memo } from 'react'

const TicketPointsEditor = ({ points, onChange }) => <input type="number" step="1" min="0" max="255" className="points-editor" value={points} onChange={onChange} />

TicketPointsEditor.propTypes = {
    points: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(TicketPointsEditor)
