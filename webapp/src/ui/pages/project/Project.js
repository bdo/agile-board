import './Project.css'

import { H1, Icon } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import React, { useCallback, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd-cjs'
import MultiBackend from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'
import { useParams } from 'react-router'

import ProjectService from '../../../services/ProjectService'
import TicketService from '../../../services/TicketService'
import ProjectForm from '../../components/project-form/ProjectForm'
import TicketTile from '../../components/ticket-tile/TicketTile'

const Project = () => {
    const [project, setProject] = useState(null)
    const [editing, setEditing] = useState(false)
    const [tickets, setTickets] = useState([])

    const { id } = useParams()

    const fetchProject = useCallback(() => {
        ProjectService.get(id).then(setProject)
    }, [id])

    const fetchTickets = useCallback(() => {
        TicketService.list({ projectId: id }).then(setTickets)
    }, [id])

    useEffect(() => {
        fetchProject()
        fetchTickets()
    }, [fetchProject, fetchTickets])

    const onSave = useCallback(
        project => {
            ProjectService.save(project)
                .then(fetchProject)
                .then(setEditing.bind(this, false))
        },
        [fetchProject]
    )

    const moveTicket = useCallback(
        (ticket, priority, state) => {
            TicketService.save({ ...ticket, priority, state }).then(fetchTickets)
        },
        [fetchTickets]
    )

    if (!project) return null

    return (
        <section id="project">
            <H1>
                {project.name}
                {!project.archived && <Icon icon={IconNames.EDIT} iconSize={36} onClick={setEditing.bind(this, true)} className="icon" />}
            </H1>
            <p>{project.description}</p>
            {editing && <ProjectForm project={project} onSave={onSave} onClose={setEditing.bind(this, false)} />}
            <div className="backlog">
                <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                    {tickets.map(ticket => (
                        <TicketTile key={ticket.id} ticket={ticket} onMoveTicket={moveTicket} onRefreshTickets={fetchTickets} />
                    ))}
                </DndProvider>
            </div>
        </section>
    )
}

export default Project
