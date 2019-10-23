import './TicketAssigneesSelect.css'

import { MenuItem } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { MultiSelect } from '@blueprintjs/select'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'

import UserService from '../../../services/UserService'
import Avatar from '../avatar/Avatar'

const tagRenderer = user => <Avatar key={user.id} user={user} />

const _itemRenderer = (user, { handleClick }, assignees) => (
    <MenuItem
        key={user.id}
        onClick={handleClick}
        icon={assignees.findIndex(assignee => assignee.id === user.id) > -1 ? IconNames.TICK : IconNames.BLANK}
        text={user.name}
        labelElement={tagRenderer(user)}
    />
)

const TicketAssigneesSelect = ({ assignees, onChange }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        UserService.list().then(setUsers)
    }, [])

    const itemRenderer = useCallback((user, props) => _itemRenderer(user, props, assignees), [assignees])

    if (!users.length) return null

    return (
        <div className="ticket-assignees-select">
            <MultiSelect
                items={users}
                selectedItems={assignees}
                itemRenderer={(user, props) => itemRenderer(user, props, assignees)}
                tagRenderer={tagRenderer}
                filterable={false}
                onItemSelect={onChange}
                tagInputProps={{ className: 'ticket-assignees-select-input', onRemove: ({ props }) => onChange(props.user) }}
            />
        </div>
    )
}

TicketAssigneesSelect.propTypes = {
    assignees: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TicketAssigneesSelect