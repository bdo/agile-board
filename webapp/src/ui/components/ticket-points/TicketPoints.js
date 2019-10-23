import './TicketPoints.css'

import { InputGroup, MenuItem } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Select } from '@blueprintjs/select'
import PropTypes from 'prop-types'
import React, { memo, useCallback } from 'react'

const _itemRenderer = (_points, { handleClick }, points) => (
    <MenuItem key={_points} onClick={handleClick} icon={points === _points ? IconNames.TICK : IconNames.BLANK} text={_points} />
)

const TicketPoints = ({ editing, points, onChange }) => {
    const itemRenderer = useCallback((_points, props) => _itemRenderer(_points, props, points), [points])

    if (!editing) return <div className="points">{points}</div>

    return (
        <Select filterable={false} itemRenderer={itemRenderer} onItemSelect={onChange} items={[1, 2, 3, 5, 8, 13]}>
            <InputGroup className="ticket-points-editor" value={points} readOnly size="1" />
        </Select>
    )
}

TicketPoints.propTypes = {
    editing: PropTypes.bool.isRequired,
    points: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(TicketPoints)
