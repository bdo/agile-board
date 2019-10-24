import './TicketPoints.css'

import { InputGroup, MenuItem } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Select } from '@blueprintjs/select'
import PropTypes from 'prop-types'
import React, { memo, useCallback } from 'react'

const TicketPoints = ({ points, onChange }) => {
    const itemRenderer = useCallback(
        (_points, { handleClick }) => <MenuItem key={_points} onClick={handleClick} icon={points === _points ? IconNames.TICK : IconNames.BLANK} text={_points} />,
        [points]
    )

    return (
        <Select filterable={false} itemRenderer={itemRenderer} onItemSelect={points => onChange('points', points)} items={[1, 2, 3, 5, 8, 13]}>
            <InputGroup className="ticket-points-editor" value={points} readOnly size="1" />
        </Select>
    )
}

TicketPoints.propTypes = {
    points: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(TicketPoints)
