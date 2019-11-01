import './TicketPointsEditor.css'

import { InputGroup, MenuItem } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Select } from '@blueprintjs/select'
import PropTypes from 'prop-types'
import React, { memo, useCallback } from 'react'

const TicketPointsEditor = ({ points, onChange }) => {
    const itemRenderer = useCallback(
        (_points, { handleClick }) => {
            const icon = points === _points ? IconNames.TICK : IconNames.BLANK
            return <MenuItem key={_points} className={`option-${_points}`} onClick={handleClick} icon={icon} text={_points} />
        },
        [points]
    )

    return (
        <Select filterable={false} itemRenderer={itemRenderer} onItemSelect={points => onChange('points', points)} items={[1, 2, 3, 5, 8, 13]} popoverProps={{ usePortal: false }}>
            <InputGroup className="ticket-points-editor" value={points} readOnly size="1" />
        </Select>
    )
}

TicketPointsEditor.propTypes = {
    points: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(TicketPointsEditor)
