import PropTypes from 'prop-types'
import React, { memo } from 'react'

const TicketPointsEditor = ({ points, onChange }) => (
    <select value={points} onChange={onChange}>
        <option value="0.5">0.5</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="8">8</option>
    </select>
)
TicketPointsEditor.propTypes = {
    points: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(TicketPointsEditor)
