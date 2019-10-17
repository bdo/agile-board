import './Ticket.css'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import TicketAssignees from '../ticket-assignees/TicketAssignees'
import TicketButtonBar from '../ticket-button-bar/TicketButtonBar'
import TicketDescription from '../ticket-description/TicketDescription'
import TicketPlaceholder from '../ticket-placeholder/TicketPlaceholder'
import TicketPoints from '../ticket-points/TicketPoints'
import TicketSummary from '../ticket-summary/TicketSummary'
import TicketType from '../ticket-type/TicketType'

class Ticket extends React.Component {
    constructor(props) {
        super(props)
        const { id, state = 'to-do', type = 'story', points = 0, assignees = [], summary = '', description = '' } = this.props.ticket
        this.state = { editing: id === null, id, state, type, points, assignees, summary, description }
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

    changeType(e) {
        this.setState({ type: e.target.value })
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

    renderTicketContent() {
        const { editing, type, assignees, points, summary, description } = this.state
        return (
            <div className={classnames('ticket', type)} onClick={this.startEditing.bind(this)} title={description}>
                <div className="ticket-top">
                    <TicketAssignees assignees={assignees} editing={editing} onAdd={this.addAssignee.bind(this)} onDelete={this.deleteAssignee.bind(this)} />
                    <TicketType type={type} editing={editing} onChange={this.changeType.bind(this)} />
                    <TicketPoints points={points} editing={editing} onChange={this.changePoints.bind(this)} />
                </div>
                <div className="ticket-bottom">
                    <TicketSummary summary={summary} editing={editing} onChange={this.changeSummary.bind(this)} />
                    <TicketDescription description={description} editing={editing} onChange={this.changeDescription.bind(this)} />
                </div>
                <TicketButtonBar editing={editing} onDelete={this.delete.bind(this)} />
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
