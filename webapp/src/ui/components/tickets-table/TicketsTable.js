import './TicketsTable.css'

import { HTMLTable, NonIdealState } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { DndProvider, useDrop } from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'
import { NavLink } from 'react-router-dom'

import Ticket from '../../components/ticket/Ticket'

const COLUMNS = [
    { id: 'to-do', label: 'To do' },
    { id: 'in-progress', label: 'In progress' },
    { id: 'to-review', label: 'To review' },
    { id: 'to-test', label: 'To test' },
    { id: 'done', label: 'Done' }
]

const TicketsTableCell = ({ priority, state, onMoveTicket, onSaveTicket, onDeleteTicket, ticket }) => {
    const dropProps = { accept: 'ticket', drop: item => onMoveTicket(item.ticket, priority, state), collect: monitor => ({ isOver: !!monitor.isOver() }) }
    const [{ isOver }, drop] = useDrop(dropProps)

    return (
        <td ref={drop} className={classnames('drop', { dropping: isOver })}>
            {ticket.state === state && <Ticket ticket={ticket} onSave={onSaveTicket} onDelete={onDeleteTicket} />}
        </td>
    )
}

TicketsTableCell.propTypes = {
    priority: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    ticket: PropTypes.object.isRequired,
    onMoveTicket: PropTypes.func.isRequired,
    onSaveTicket: PropTypes.func.isRequired,
    onDeleteTicket: PropTypes.func.isRequired
}

const TicketsTable = ({ projectId, tickets, onMoveTicket, onSaveTicket, onDeleteTicket }) => {
    if (!tickets.length)
        return (
            <NonIdealState
                icon={IconNames.SEARCH}
                title="Not tickets found"
                description="You can create tickets in the backlog of the project"
                action={<NavLink to={`/projects/${projectId}`}>Go to project page</NavLink>}
            />
        )

    return (
        <HTMLTable striped condensed className="tickets-table">
            <thead>
                <tr>
                    {COLUMNS.map(col => (
                        <th key={col.id}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                    {tickets.map(ticket => (
                        <tr key={ticket.id}>
                            {COLUMNS.map(col => (
                                <TicketsTableCell
                                    key={col.id}
                                    priority={ticket.priority}
                                    state={col.id}
                                    ticket={ticket}
                                    onMoveTicket={onMoveTicket}
                                    onSaveTicket={onSaveTicket}
                                    onDeleteTicket={onDeleteTicket}
                                />
                            ))}
                        </tr>
                    ))}
                </DndProvider>
            </tbody>
        </HTMLTable>
    )
}

TicketsTable.propTypes = {
    projectId: PropTypes.number.isRequired,
    tickets: PropTypes.array.isRequired,
    onMoveTicket: PropTypes.func.isRequired,
    onSaveTicket: PropTypes.func.isRequired,
    onDeleteTicket: PropTypes.func.isRequired
}

export default TicketsTable
