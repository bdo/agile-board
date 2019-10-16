import './Ticket.css'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import Avatar from '../avatar/Avatar'
import TicketAssigneeEditor from '../ticket-assignee-editor/TicketAssigneeEditor'
import TicketAssigneeSelect from '../ticket-assignee-select/TicketAssigneeSelect'
import TicketButtonBar from '../ticket-button-bar/TicketButtonBar'
import TicketDescriptionEditor from '../ticket-description-editor/TicketDescriptionEditor'
import TicketPlaceholder from '../ticket-placeholder/TicketPlaceholder'
import TicketPointsEditor from '../ticket-points-editor/TicketPointsEditor'
import TicketSummaryEditor from '../ticket-summary-editor/TicketSummaryEditor'

class Ticket extends React.Component {
    constructor(props) {
        super(props)
        const { id, state = 'to-do', type = 'story', points = 0, assignees = [], summary = '', description = '' } = this.props.ticket
        this.state = { editing: id === null, id, state, type, points, assignees, summary }
    }

    resetState() {
        const { id, state, type, points, assignees, summary, description } = this.props.ticket
        this.setState({ id, state, type, points, assignees, summary, description })
    }

    save() {
        const { onSave, onStopEdition } = this.props
        const { id, state, type, points, assignees, summary, description } = this.state
        onSave({ id, state, type, points, assignees, summary, description })
        onStopEdition && onStopEdition()
        this.endEditing()
    }

    delete() {
        const { onDelete } = this.props
        const { id } = this.state
        onDelete(id)
        this.endEditing()
    }

    startEditing(e) {
        e.stopPropagation()
        if (this.state.editing) return
        this.setState({ editing: true })
    }

    cancelEditing() {
        const { onStopEdition } = this.props
        onStopEdition && onStopEdition()
        this.resetState()
        this.endEditing()
    }

    endEditing() {
        if (!this.state.editing) return
        this.setState({ editing: false })
    }

    changePoints(e) {
        this.setState({ points: +e.target.value })
    }

    changeSummary(e) {
        this.setState({ summary: e.target.value })
    }

    changeDescription(e) {
        this.setState({ description: e.target.value })
    }

    addAssignee(id) {
        const { assignees } = this.state
        this.setState({ assignees: [...assignees, { id }] })
    }

    deleteAssignee(id) {
        const { assignees } = this.state
        const index = assignees.findIndex(assigneeId => assigneeId === id)
        assignees.splice(index, 1)
        this.setState({ assignees })
    }

    renderAvatar(editing, assignee) {
        if (!editing) return <Avatar key={assignee.id} user={assignee} size={24} />
        return <TicketAssigneeEditor key={assignee.id} assignee={assignee} onDelete={this.deleteAssignee.bind(this)} />
    }

    renderPoints(editing, points) {
        if (!editing) return <div className="points">{points}</div>
        return <TicketPointsEditor points={points} onChange={this.changePoints.bind(this)} />
    }

    renderSummary(editing, summary) {
        if (!editing) return <div className="summary">{summary}</div>
        return <TicketSummaryEditor summary={summary} onChange={this.changeSummary.bind(this)} />
    }

    renderTicketContent() {
        const { editing, type, assignees, points, summary, description } = this.state
        return (
            <div className={classnames('ticket', type)} onClick={this.startEditing.bind(this)} title={description}>
                <div className="ticket-top">
                    <div className="assignees">
                        {assignees.map(assignee => this.renderAvatar(editing, assignee))}
                        {editing && <TicketAssigneeSelect assignees={assignees} onAddAssignee={this.addAssignee.bind(this)} />}
                    </div>
                    {this.renderPoints(editing, points)}
                </div>
                <div className="ticket-bottom">
                    {this.renderSummary(editing, summary)}
                    {editing && <TicketDescriptionEditor description={description} onChange={this.changeDescription.bind(this)} />}
                </div>
                {editing && <TicketButtonBar onDelete={this.delete.bind(this)} />}
            </div>
        )
    }

    renderForm() {
        return <form onSubmit={this.save.bind(this)}>{this.renderTicketContent()}</form>
    }

    render() {
        const { editing } = this.state
        return (
            <TicketPlaceholder>
                <div className={classnames('ticket-backdrop', { editing })} onClick={this.cancelEditing.bind(this)}>
                    {editing ? this.renderForm() : this.renderTicketContent()}
                </div>
            </TicketPlaceholder>
        )
    }
}

Ticket.propTypes = {
    ticket: PropTypes.object.isRequired,
    onDelete: PropTypes.func,
    onSave: PropTypes.func.isRequired
}

export default Ticket
