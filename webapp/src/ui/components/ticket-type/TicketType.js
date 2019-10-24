import './TicketType.css'

import { Colors, InputGroup, MenuItem } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Select } from '@blueprintjs/select'
import PropTypes from 'prop-types'
import React, { memo, useCallback } from 'react'

const TYPES = ['story', 'task', 'bug']
const COLORS = { story: Colors.GOLD5, task: Colors.BLUE5, bug: Colors.RED5 }

const TicketType = ({ type, onChange }) => {
    const itemRenderer = useCallback(
        (_type, { handleClick }) => (
            <MenuItem key={_type} style={{ backgroundColor: COLORS[_type] }} onClick={handleClick} icon={_type === type ? IconNames.TICK : IconNames.BLANK} text={_type} />
        ),
        [type]
    )

    return (
        <Select filterable={false} itemRenderer={itemRenderer} onItemSelect={type => onChange('type', type)} items={TYPES}>
            <InputGroup className="ticket-type-editor" value={type} readOnly size="5" />
        </Select>
    )
}

TicketType.propTypes = {
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(TicketType)
