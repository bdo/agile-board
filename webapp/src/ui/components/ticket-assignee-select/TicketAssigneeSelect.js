import './TicketAssigneeSelect.css'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import UserService from '../../../services/UserService'

class TicketAssigneeSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = { open: false, assignees: [] }
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
        const assignees = await UserService.list()
        this.setState({ assignees })
    }

    render() {
        const { open, assignees } = this.state
        return (
            <div className="add-assignee">
                <div className={classnames('add-assignee-button', { open })} onClick={this.setOpen.bind(this, !open)}>
                    +
                </div>
                {open && (
                    <div className="add-assignee-tooltip">
                        {assignees.map(({ id, name }) => (
                            <img key={id} src={`/images/avatar/${id}.png`} alt="" width={48} title={name} onClick={this.addAssignee.bind(this, id)} />
                        ))}
                    </div>
                )}
            </div>
        )
    }
}
TicketAssigneeSelect.propTypes = {
    onAddAssignee: PropTypes.func.isRequired
}

export default TicketAssigneeSelect
