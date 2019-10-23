import './Board.css'

import { Alignment, Button, MenuItem, Navbar } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Select } from '@blueprintjs/select'
import React, { useCallback, useEffect, useState } from 'react'

import ProjectService from '../../../services/ProjectService'
import TicketService from '../../../services/TicketService'
import TicketsTable from '../../components/tickets-table/TicketsTable'

const _itemRenderer = (_project, { handleClick }, project) => {
    return <MenuItem key={_project.id} onClick={handleClick} icon={project.id === _project.id ? IconNames.TICK : IconNames.BLANK} text={_project.name} />
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

    const itemRenderer = useCallback((_project, props) => _itemRenderer(_project, props, project), [project])

    if (!project.id) return null

    return (
        <div id="board">
            <Navbar>
                <Navbar.Group className="board-navbar" align={Alignment.CENTER}>
                    <Select items={projects} onItemSelect={setProject} itemRenderer={itemRenderer} itemPredicate={itemPredicate}>
                        <Button rightIcon="double-caret-vertical">{project.name}</Button>
                    </Select>
                </Navbar.Group>
            </Navbar>
            <TicketsTable projectId={project.id} tickets={tickets} onMoveTicket={moveTicket} onSaveTicket={saveTicket} onDeleteTicket={deleteTicket} />
        </div>
    )
}

export default Board
