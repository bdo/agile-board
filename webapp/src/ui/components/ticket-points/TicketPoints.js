import './TicketPoints.css'

import PropTypes from 'prop-types'
import React, { memo } from 'react'

const TicketPoints = ({ editing, points, onChange }) => {
    if (!editing) return <div className="points">{points}</div>
    return <input type="number" step="1" min="0" max="255" className="points-editor" value={points} onChange={onChange} />
}

TicketPoints.propTypes = {
    editing: PropTypes.bool.isRequired,
    points: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(TicketPoints)
