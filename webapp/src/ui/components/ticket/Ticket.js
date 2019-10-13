import './Ticket.css'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import TicketAssigneeEditor from '../ticket-assignee-editor/TicketAssigneeEditor'
import TicketButtonBar from '../ticket-button-bar/TicketButtonBar'
import TicketPlaceholder from '../ticket-placeholder/TicketPlaceholder'
import TicketPointsEditor from '../ticket-points-editor/TicketPointsEditor'
import TicketSummaryEditor from '../ticket-summary-editor/TicketSummaryEditor'

class Ticket extends React.Component {
    constructor(props) {
        super(props)
        const { id, state = 'to-do', type = 'story', points = 0, assignees = [], summary = '' } = props.ticket
        this.state = { editing: id === null, id, state, type, points, assignees, summary }
    }

    save() {
        const { onSave } = this.props
        const { id, state, type, points, assignees, summary } = this.state
        onSave({ id, state, type, points, assignees, summary })
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

    deleteAssignee(id) {
        const { assignees } = this.state
        const index = assignees.findIndex(assigneeId => assigneeId === id)
        assignees.splice(index, 1)
        this.setState({ assignees })
    }

    renderAvatar(editing, id) {
        if (!editing) return <img key={id} src={`/images/avatar/${id}.png`} alt={id} width={24} />
        return <TicketAssigneeEditor key={id} assigneeId={id} onDelete={this.deleteAssignee.bind(this)} />
    }

    renderPoints(editing, points) {
        if (!editing) return <div className="points">{points}</div>
        return <TicketPointsEditor points={points} onChange={this.changePoints.bind(this)} />
    }

    renderSummary(editing, summary) {
        if (!editing) return <div className="summary">{summary}</div>
        return <TicketSummaryEditor summary={summary} onChange={this.changeSummary.bind(this)} />
    }

    render() {
        const { editing, type, assignees, points, summary } = this.state
        return (
            <TicketPlaceholder>
                <div className={classnames('ticket-backdrop', { editing })} onClick={this.endEditing.bind(this)}>
                    <div className={classnames('ticket', type)} onClick={this.startEditing.bind(this)}>
                        <div className="ticket-top">
                            <div className="assignees">{assignees.map(id => this.renderAvatar(editing, id))}</div>
                            {this.renderPoints(editing, points)}
                        </div>
                        <div className="ticket-bottom">{this.renderSummary(editing, summary)}</div>
                        {editing && <TicketButtonBar onSave={this.save.bind(this)} onDelete={this.delete.bind(this)} />}
                    </div>
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
