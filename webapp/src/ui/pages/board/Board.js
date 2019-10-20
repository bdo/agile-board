import './Board.css'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { useDrop } from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'

import TicketService from '../../../services/TicketService'
import Header from '../../components/header/Header'
import TicketPlaceholder from '../../components/ticket-placeholder/TicketPlaceholder'
import Ticket from '../../components/ticket/Ticket'

const BoardCell = ({ priority, state, onMoveTicket, children }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'ticket',
        drop: item => onMoveTicket(item.ticket, priority, state),
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })

    return (
        <div ref={drop} className={classnames('cell', { dropping: isOver })}>
            {children}
        </div>
    )
}

BoardCell.propTypes = {
    state: PropTypes.string.isRequired,
    onMoveTicket: PropTypes.func.isRequired
}

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = { projectId: null, ticket: null, tickets: [] }
        this.columns = [
            { id: 'to-do', label: 'To do' },
            { id: 'in-progress', label: 'In progress' },
            { id: 'to-review', label: 'To review' },
            { id: 'to-test', label: 'To test' },
            { id: 'done', label: 'Done' }
        ]
    }

    async fetchTickets(projectId) {
        const tickets = await TicketService.list({ projectId })
        this.setState({ tickets })
    }

    async saveTicket(ticket) {
        const { projectId } = this.state
        await TicketService.save({ ...ticket, projectId })
        this.fetchTickets(projectId)
    }

    async deleteTicket(id) {
        const { projectId } = this.state
        await TicketService.delete(id)
        this.fetchTickets(projectId)
    }

    async moveTicket(ticket, priority, state) {
        const { projectId } = this.state
        await TicketService.save({ ...ticket, priority, state, projectId })
        this.fetchTickets(projectId)
    }

    selectProject(projectId) {
        this.setState({ projectId })
        this.fetchTickets(projectId)
    }

    createTicket() {
        this.setState({ ticket: { id: null, state: 'to-do' } })
    }

    closeTicket() {
        this.setState({ ticket: null })
    }

    render() {
        const { ticket, tickets } = this.state
        return (
            <section id="home">
                <Header onSelectProject={this.selectProject.bind(this)} />
                <div className="board">
                    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                        <div className="table">
                            <div className="row">
                                {this.columns.map(column => (
                                    <div className="cell" key={column.id}>
                                        <h1>{column.label}</h1>
                                    </div>
                                ))}
                            </div>
                            {tickets.map(ticket => (
                                <div className="row" key={ticket.id}>
                                    {this.columns.map(column => (
                                        <BoardCell key={column.id} priority={ticket.priority} state={column.id} onMoveTicket={this.moveTicket.bind(this)}>
                                            {ticket.state === column.id && <Ticket ticket={ticket} onSave={this.saveTicket.bind(this)} onDelete={this.deleteTicket.bind(this)} />}
                                        </BoardCell>
                                    ))}
                                </div>
                            ))}
                            <div className="row">
                                {this.columns.map(column => (
                                    <div className="cell" key={column.id}>
                                        {column.id === 'to-do' && (
                                            <React.Fragment>
                                                {ticket && <Ticket ticket={ticket} onStopEdition={this.closeTicket.bind(this)} onSave={this.saveTicket.bind(this)} />}
                                                <TicketPlaceholder className="add-ticket" onClick={this.createTicket.bind(this)}>
                                                    +
                                                </TicketPlaceholder>
                                            </React.Fragment>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DndProvider>
                </div>
            </section>
        )
    }
}

export default Board
