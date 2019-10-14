import './TicketAssigneeSelect.css'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import UserService from '../../../services/UserService'
import Avatar from '../avatar/Avatar'

class TicketAssigneeSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = { open: false, users: [] }
    }

    setOpen(open) {
        this.setState({ open })
    }

    addAssignee(id) {
        const { onAddAssignee } = this.props
        onAddAssignee(id)
        this.setOpen(false)
    }

    async componentDidMount() {
        const users = await UserService.list()
        this.setState({ users })
    }

    render() {
        const { assignees } = this.props
        const { open, users } = this.state
        const _users = users.filter(user => !assignees.some(assignee => assignee.id === user.id))
        if (!_users.length) return null
        return (
            <div className="add-assignee">
                <div className={classnames('add-assignee-button', { open })} onClick={this.setOpen.bind(this, !open)}>
                    +
                </div>
                {open && (
                    <div className="add-assignee-tooltip">
                        {_users.map(user => (
                            <Avatar key={user.id} user={user} size={48} onClick={this.addAssignee.bind(this, user.id)} />
                        ))}
                    </div>
                )}
            </div>
        )
    }
}
TicketAssigneeSelect.propTypes = {
    assignees: PropTypes.array.isRequired,
    onAddAssignee: PropTypes.func.isRequired
}

export default TicketAssigneeSelect
