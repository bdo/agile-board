import './Project.css'

import { H1, Icon } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import React, { useCallback, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd-cjs'
import MultiBackend from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'
import { useParams } from 'react-router'

import ProjectService from '../../../services/ProjectService'
import SprintService from '../../../services/SprintService'
import ProjectForm from '../../components/project-form/ProjectForm'
import SprintPanel from '../../components/sprint-panel/SprintPanel'

const Project = () => {
    const [project, setProject] = useState(null)
    const [editing, setEditing] = useState(false)
    const [sprints, setSprints] = useState([])

    const { id } = useParams()

    const fetchProject = useCallback(() => {
        ProjectService.get(id).then(setProject)
    }, [id])

    const fetchSprints = useCallback(() => {
        SprintService.list({ projectId: id }).then(setSprints)
    }, [id])

    useEffect(() => {
        fetchProject()
        fetchSprints()
    }, [fetchProject, fetchSprints])

    const onSave = useCallback(
        project => {
            ProjectService.save(project)
                .then(fetchProject)
                .then(setEditing.bind(this, false))
        },
        [fetchProject]
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
                    {sprints.map(sprint => (
                        <SprintPanel key={sprint.id} sprint={sprint} onRefreshSprints={fetchSprints} />
                    ))}
                </DndProvider>
            </div>
        </section>
    )
}

export default Project
