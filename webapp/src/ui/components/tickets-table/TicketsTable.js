import './TicketsTable.css'

import { HTMLTable, NonIdealState, Spinner } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { DndProvider, useDrop } from 'react-dnd-cjs'
import MultiBackend from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'
import { NavLink } from 'react-router-dom'

import TicketService from '../../../services/TicketService'
import Ticket from '../../components/ticket/Ticket'

const COLUMNS = [
    { id: 'to-do', label: 'To do' },
    { id: 'in-progress', label: 'In progress' },
    { id: 'to-review', label: 'To review' },
    { id: 'to-test', label: 'To test' },
    { id: 'done', label: 'Done' }
]

const TicketsTableCell = ({ priority, state, onMoveTicket, onRefreshTickets, ticket }) => {
    const dropProps = { accept: 'ticket', drop: item => onMoveTicket(item.ticket, priority, state), collect: monitor => ({ isOver: !!monitor.isOver() }) }
    const [{ isOver }, drop] = useDrop(dropProps)

    return (
        <td ref={drop} className={classnames('drop', { dropping: isOver })}>
            {ticket.state === state && <Ticket ticket={ticket} onRefreshTickets={onRefreshTickets} />}
        </td>
    )
}

TicketsTableCell.propTypes = {
    priority: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    ticket: PropTypes.object.isRequired,
    onMoveTicket: PropTypes.func.isRequired,
    onRefreshTickets: PropTypes.func.isRequired
}

const TicketsTable = ({ projectId }) => {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!projectId) return
        setLoading(true)
        TicketService.list({ projectId })
            .then(setTickets)
            .then(setLoading.bind(this, false))
    }, [projectId])

    const moveTicket = useCallback(
        (ticket, priority, state) => {
            TicketService.save({ ...ticket, priority, state, projectId })
                .then(TicketService.list.bind(this, { projectId }))
                .then(setTickets)
        },
        [projectId]
    )

    const refreshTickets = useCallback(() => TicketService.list({ projectId }).then(setTickets), [projectId])

    if (loading) return <Spinner className="tickets-table-spinner" />

    if (!tickets.length)
        return (
            <NonIdealState
                className="tickets-table-no-results"
                icon={IconNames.SEARCH}
                title="No tickets found"
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
                                    onMoveTicket={moveTicket}
                                    onRefreshTickets={refreshTickets}
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
    projectId: PropTypes.number.isRequired
}

export default TicketsTable
