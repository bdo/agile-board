import './Ticket.css'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import TicketService from '../../../services/TicketService'
import TicketAssigneeEditor from '../ticket-assignee-editor/TicketAssigneeEditor'
import TicketButtonBar from '../ticket-button-bar/TicketButtonBar'
import TicketPointsEditor from '../ticket-points-editor/TicketPointsEditor'
import TicketSummaryEditor from '../ticket-summary-editor/TicketSummaryEditor'

class Ticket extends React.Component {
    constructor(props) {
        super(props)

        this.state = { editing: false, ticket: null }
    }

    async fetchTicket() {
        const { id } = this.props
        const ticket = await TicketService.get(id)
        this.setState({ ticket })
    }

    async saveTicket() {
        const { ticket } = this.state
        await TicketService.save(ticket)
        this.fetchTicket()
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
        this.fetchTicket()
    }

    changePoints(e) {
        const { ticket } = this.state
        this.setState({ ticket: { ...ticket, sp: +e.target.value } })
    }

    changeSummary(e) {
        const { ticket } = this.state
        this.setState({ ticket: { ...ticket, summary: e.target.value } })
    }

    deleteAssignee(id) {
        const { ticket } = this.state
        const index = ticket.assignees.findIndex(assigneeId => assigneeId === id)
        ticket.assignees.splice(index, 1)
        this.setState({ ticket })
    }

    componentDidMount() {
        this.fetchTicket()
    }

    renderAvatar(editing, id) {
        if (!editing) return <img key={id} src={`/images/avatar/${id}.png`} alt={id} width={24} />
        return <TicketAssigneeEditor key={id} assigneeId={id} onDelete={this.deleteAssignee.bind(this)} />
    }

    renderPoints(editing, ticket) {
        if (!editing) return <div className="points">{ticket.sp}</div>
        return <TicketPointsEditor points={ticket.sp} onChange={this.changePoints.bind(this)} />
    }

    renderSummary(editing, ticket) {
        if (!editing) return <div className="summary">{ticket.summary}</div>
        return <TicketSummaryEditor summary={ticket.summary} onChange={this.changeSummary.bind(this)} />
    }

    render() {
        const { onDelete } = this.props
        const { editing, ticket } = this.state
        if (!ticket) return null
        return (
            <div className="ticket-placeholder">
                <div className={classnames('ticket-backdrop', { editing })} onClick={this.endEditing.bind(this)}>
                    <div className={classnames('ticket', ticket.type)} onClick={this.startEditing.bind(this)}>
                        <div className="ticket-top">
                            <div className="assignees">{ticket.assignees.map(id => this.renderAvatar(editing, id))}</div>
                            {this.renderPoints(editing, ticket)}
                        </div>
                        <div className="ticket-bottom">{this.renderSummary(editing, ticket)}</div>
                        {editing && <TicketButtonBar onSave={this.saveTicket.bind(this)} onDelete={onDelete.bind(this, ticket.id)} />}
                    </div>
                </div>
            </div>
        )
    }
}

Ticket.propTypes = {
    id: PropTypes.number,
    onDelete: PropTypes.func.isRequired
}

export default Ticket
