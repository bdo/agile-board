import './Board.css'

import { Alignment, Button, MenuItem, Navbar } from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'
import React, { useCallback, useEffect, useState } from 'react'

import ProjectService from '../../../services/ProjectService'
import TicketService from '../../../services/TicketService'
import TicketsTable from '../../components/tickets-table/TicketsTable'

const itemRenderer = (project, { handleClick, modifiers }) => {
    return <MenuItem key={project.id} onClick={handleClick} active={modifiers.active} disabled={modifiers.disabled} text={project.name} />
}

const itemPredicate = (query, { name = '', description = '' }, _index, exactMatch) => {
    const normalizedQuery = query.toLowerCase()
    const normalizedName = name.toLowerCase()
    const normalizedDescription = description.toLowerCase()

    return (exactMatch && normalizedQuery === normalizedName) || normalizedName.indexOf(query) > -1 || normalizedDescription.indexOf(query) > -1
}

const Board = () => {
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState({})
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        ProjectService.list({ archived: false })
            .then(projects => {
                setProject(projects[0])
                return projects
            })
            .then(setProjects)
    }, [])

    useEffect(() => {
        if (!project.id) return
        TicketService.list({ projectId: project.id }).then(setTickets)
    }, [project])

    const moveTicket = useCallback(
        (ticket, priority, state) => {
            TicketService.save({ ...ticket, priority, state, projectId: project.id })
                .then(TicketService.list.bind(this, { projectId: project.id }))
                .then(setTickets)
        },
        [project]
    )

    const saveTicket = useCallback(
        ticket => {
            TicketService.save({ ...ticket, projectId: project.id })
                .then(TicketService.list.bind(this, { projectId: project.id }))
                .then(setTickets)
        },
        [project]
    )

    const deleteTicket = useCallback(
        id => {
            TicketService.delete(id)
                .then(TicketService.list.bind(this, { projectId: project.id }))
                .then(setTickets)
        },
        [project]
    )

    return (
        <div id="board">
            <Navbar>
                <Navbar.Group className="board-navbar" align={Alignment.CENTER}>
                    <Select items={projects} onItemSelect={setProject} itemRenderer={itemRenderer} itemPredicate={itemPredicate}>
                        <Button rightIcon="double-caret-vertical">{project.name}</Button>
                    </Select>
                </Navbar.Group>
            </Navbar>
            {tickets.length && <TicketsTable tickets={tickets} onMoveTicket={moveTicket} onSaveTicket={saveTicket} onDeleteTicket={deleteTicket} />}
        </div>
    )
}

export default Board
