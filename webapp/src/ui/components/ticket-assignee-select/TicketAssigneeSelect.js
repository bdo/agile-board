import './TicketAssigneeSelect.css'

import { MenuItem } from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/select'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'

import UserService from '../../../services/UserService'
import Avatar from '../avatar/Avatar'

const tagRenderer = user => <Avatar key={user.id} user={user} />

const _itemRenderer = (user, { handleClick, modifiers }, assignees) => (
    <MenuItem
        key={user.id}
        onClick={handleClick}
        active={modifiers.active}
        disabled={modifiers.disabled}
        icon={assignees.findIndex(assignee => assignee.id === user.id) > -1 ? 'tick' : 'blank'}
        text={user.name}
        labelElement={tagRenderer(user)}
    />
)

const TicketAssigneeSelect = ({ assignees, onChange }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        UserService.list().then(setUsers)
    }, [])

    const itemRenderer = useCallback((user, props) => _itemRenderer(user, props, assignees), [assignees])

    if (!users.length) return null

    return (
        <MultiSelect
            items={users}
            selectedItems={assignees}
            itemRenderer={(user, props) => itemRenderer(user, props, assignees)}
            tagRenderer={tagRenderer}
            filterable={false}
            onItemSelect={onChange}
            tagInputProps={{ onRemove: ({ props }) => onChange(props.user) }}
        />
    )
}

TicketAssigneeSelect.propTypes = {
    assignees: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TicketAssigneeSelect
