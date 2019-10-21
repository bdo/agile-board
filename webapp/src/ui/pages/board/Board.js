import './Board.css'

import React, { useCallback, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'
import { useParams } from 'react-router'

import ProjectService from '../../../services/ProjectService'
import TicketService from '../../../services/TicketService'
import BoardCell from '../../components/board-cell/BoardCell'

const COLUMNS = [
    { id: 'to-do', label: 'To do' },
    { id: 'in-progress', label: 'In progress' },
    { id: 'to-review', label: 'To review' },
    { id: 'to-test', label: 'To test' },
    { id: 'done', label: 'Done' }
]

const Board = () => {
    const { projectId } = useParams()
    const [project, setProject] = useState([])
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        TicketService.list({ projectId }).then(setTickets)
    }, [projectId])
    useEffect(() => {
        ProjectService.get(projectId).then(setProject)
    }, [projectId])

    const moveTicket = useCallback(
        (ticket, priority, state) => {
            TicketService.save({ ...ticket, priority, state, projectId })
                .then(TicketService.list.bind(this, { projectId }))
                .then(setTickets)
        },
        [projectId]
    )

    const saveTicket = useCallback(
        ticket => {
            TicketService.save({ ...ticket, projectId })
                .then(TicketService.list.bind(this, { projectId }))
                .then(setTickets)
        },
        [projectId]
    )

    const deleteTicket = useCallback(
        id => {
            TicketService.delete(id)
                .then(TicketService.list.bind(this, { projectId }))
                .then(setTickets)
        },
        [projectId]
    )

    return (
        <div id="board">
            <h3>{project.name}</h3>
            <div className="board-table">
                <div className="row">
                    {COLUMNS.map(col => (
                        <div key={col.id} className="cell">
                            {col.label}
                        </div>
                    ))}
                </div>
                <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                    {tickets.map(ticket => (
                        <div key={ticket.id} className="row">
                            {COLUMNS.map(col => (
                                <BoardCell
                                    key={col.id}
                                    priority={ticket.priority}
                                    state={col.id}
                                    ticket={ticket}
                                    moveTicket={moveTicket}
                                    saveTicket={saveTicket}
                                    deleteTicket={deleteTicket}
                                />
                            ))}
                        </div>
                    ))}
                </DndProvider>
                <div className="row">
                    <div className="cell">
                        <button className="add-ticket">+</button>
                    </div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                </div>
            </div>
        </div>
    )
}

export default Board
