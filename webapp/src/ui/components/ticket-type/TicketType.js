import './TicketType.css'

import { InputGroup, MenuItem } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Select } from '@blueprintjs/select'
import PropTypes from 'prop-types'
import React, { memo, useCallback } from 'react'

const _itemRenderer = (_type, { handleClick }, type) => <MenuItem key={_type} onClick={handleClick} icon={_type === type ? IconNames.TICK : IconNames.BLANK} text={_type} />

const TYPES = ['story', 'task', 'bug']

const TicketType = ({ editing, type, onChange }) => {
    const itemRenderer = useCallback((_type, props) => _itemRenderer(_type, props, type), [type])

    if (!editing) return null
    return (
        <Select filterable={false} itemRenderer={itemRenderer} onItemSelect={onChange} items={TYPES}>
            <InputGroup className="ticket-type-editor" value={type} readOnly size="5" />
        </Select>
    )
}

TicketType.propTypes = {
    editing: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(TicketType)
