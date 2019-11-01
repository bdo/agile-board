import './Project.css'

import { H1, Icon } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import ProjectService from '../../../services/ProjectService'
import ProjectForm from '../../components/project-form/ProjectForm'
import TicketTile from '../../components/ticket-tile/TicketTile'

const Project = () => {
    const [project, setProject] = useState(null)
    const [isEditing, setEditing] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        ProjectService.get(id, { withTickets: true }).then(setProject)
    }, [id])

    const onSave = useCallback(
        project => {
            ProjectService.save(project)
                .then(ProjectService.get.bind(this, id))
                .then(setProject)
                .then(setEditing.bind(this, false))
        },
        [id]
    )

    if (!project) return null

    return (
        <div id="project">
            <H1>
                <span className="title">{project.name}</span>
                {!project.archived && <Icon icon={IconNames.EDIT} iconSize={36} onClick={setEditing.bind(this, true)} className="icon" />}
            </H1>
            <p>{project.description}</p>
            {isEditing && <ProjectForm project={project} onSave={onSave} onClose={setEditing.bind(this, false)} />}
            <div className="backlog">
                {project.tickets.map(ticket => (
                    <TicketTile key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    )
}

export default Project
