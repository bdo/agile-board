import './Home.css'

import { Divider, H1, Icon } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import React, { useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import ProjectService from '../../../services/ProjectService'
import ProjectForm from '../../components/project-form/ProjectForm'
import ProjectTile from '../../components/project-tile/ProjectTile'

const EMPTY_PROJECT = { id: null, name: '', description: '' }

const Home = () => {
    const [projects, setProjects] = useState([])
    const [isDialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        ProjectService.list().then(setProjects)
    }, [])

    const onSave = useCallback(project => {
        ProjectService.save(project)
            .then(ProjectService.list.bind(this))
            .then(setProjects)
            .then(setDialogOpen.bind(this, false))
    }, [])

    const [archivedProjects, openProjects] = projects.reduce(
        (acc, curr) => {
            acc[curr.archived ? 0 : 1].push(curr)
            return acc
        },
        [[], []]
    )

    return (
        <div id="home">
            <H1>
                <NavLink to="/board">My board</NavLink>
            </H1>
            <H1>
                My projects <Icon icon={IconNames.PLUS} iconSize={36} className="icon" onClick={setDialogOpen.bind(this, true)} />
            </H1>
            {openProjects.map(project => (
                <ProjectTile key={project.id} project={project} />
            ))}
            <Divider />
            {archivedProjects.map(project => (
                <ProjectTile key={project.id} project={project} />
            ))}
            {isDialogOpen && <ProjectForm onClose={setDialogOpen.bind(this, false)} onSave={onSave} project={EMPTY_PROJECT} />}
        </div>
    )
}

export default Home
