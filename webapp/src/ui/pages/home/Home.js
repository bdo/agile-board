import './Home.css'

import { Classes, Dialog, H1, Icon } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import React, { useCallback, useEffect, useState } from 'react'

import ProjectService from '../../../services/ProjectService'
import ProjectForm from '../../components/project-form/ProjectForm'
import ProjectTile from '../../components/project-tile/ProjectTile'

const EMPTY_PROJECT = { id: null, name: '', description: '' }

const Home = () => {
    const [project, setProject] = useState(null)
    const [projects, setProjects] = useState([])

    const fetchProjects = () => ProjectService.list().then(setProjects)

    useEffect(() => {
        fetchProjects()
    }, [])

    const onSave = useCallback(project => {
        ProjectService.save(project)
            .then(fetchProjects)
            .then(setProject.bind(this, null))
    }, [])

    return (
        <div id="home">
            <H1>
                My projects <Icon icon={IconNames.PLUS} onClick={setProject.bind(this, EMPTY_PROJECT)} className="icon" />
            </H1>
            {projects.map(project => (
                <ProjectTile key={project.id} project={project} onEdit={setProject.bind(this, project)} />
            ))}
            {project && (
                <Dialog isOpen canOutsideClickClose onClose={setProject.bind(this, null)}>
                    <div className={Classes.DIALOG_BODY}>
                        <ProjectForm project={project} onSave={onSave} />
                    </div>
                </Dialog>
            )}
        </div>
    )
}

export default Home
