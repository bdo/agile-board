import './TicketAssigneesEditor.css'

import { MenuItem } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { MultiSelect } from '@blueprintjs/select'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'

import UserService from '../../../services/UserService'
import Avatar from '../avatar/Avatar'

const tagRenderer = user => <Avatar key={user.id} user={user} />

const TicketAssigneesEditor = ({ assignees, onChange }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        UserService.list().then(setUsers)
    }, [])

    const itemRenderer = useCallback(
        (_user, { handleClick }) => {
            const icon = assignees.findIndex(assignee => assignee.id === _user.id) > -1 ? IconNames.TICK : IconNames.BLANK
            return <MenuItem key={_user.id} className={`option-${_user.id}`} onClick={handleClick} icon={icon} text={_user.name} labelElement={tagRenderer(_user)} />
        },
        [assignees]
    )

    const itemSelect = useCallback(
        user => {
            const index = assignees.findIndex(assignee => assignee.id === user.id)
            if (index === -1) onChange('assignees', [...assignees, user])
            else onChange('assignees', assignees.filter((_, i) => i !== index))
        },
        [assignees, onChange]
    )

    if (!users.length) return null

    return (
        <div className="ticket-assignees-editor">
            <MultiSelect
                items={users}
                selectedItems={assignees}
                itemRenderer={(user, props) => itemRenderer(user, props, assignees)}
                tagRenderer={tagRenderer}
                filterable={false}
                onItemSelect={itemSelect}
                tagInputProps={{ className: 'ticket-assignees-input', onRemove: ({ props: { user } }) => itemSelect(user) }}
                popoverProps={{ usePortal: false }}
            />
        </div>
    )
}

TicketAssigneesEditor.propTypes = {
    assignees: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TicketAssigneesEditor
