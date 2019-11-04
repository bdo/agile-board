import './Board.css'

import { Alignment, Button, MenuItem, Navbar, NonIdealState } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Select } from '@blueprintjs/select'
import React, { useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import ProjectService from '../../../services/ProjectService'
import SprintService from '../../../services/SprintService'
import TicketsTable from '../../components/tickets-table/TicketsTable'

const itemPredicate = (query, { name = '', description = '' }, _index, exactMatch) => {
    const normalizedQuery = query.toLowerCase()
    const normalizedName = name.toLowerCase()
    const normalizedDescription = description.toLowerCase()

    return (exactMatch && normalizedQuery === normalizedName) || normalizedName.indexOf(query) > -1 || normalizedDescription.indexOf(query) > -1
}

const Board = () => {
    const [projects, setProjects] = useState([])
    const [sprints, setSprints] = useState([])
    const [project, setProject] = useState(null)
    const [sprint, setSprint] = useState(null)

    const fetchSprints = useCallback(projectId => {
        SprintService.list({ projectId, state: 'active' }).then(sprints => {
            setSprints(sprints)
            setSprint(sprints[0])
        })
    }, [])

    const changeProject = useCallback(
        project => {
            setProject(project)
            fetchSprints(project.id)
        },
        [fetchSprints]
    )

    useEffect(() => {
        ProjectService.list({ archived: false }).then(projects => {
            setProjects(projects)
            if (projects.length) changeProject(projects[0])
        })
    }, [changeProject])

    const projectItemRenderer = useCallback(
        (_project, { handleClick }) => {
            const icon = project.id === _project.id ? IconNames.TICK : IconNames.BLANK
            return <MenuItem className={`option-${_project.id}`} key={_project.id} onClick={handleClick} icon={icon} text={_project.name} />
        },
        [project]
    )

    const sprintItemRenderer = useCallback(
        (_sprint, { handleClick }) => {
            const icon = sprint.id === _sprint.id ? IconNames.TICK : IconNames.BLANK
            return <MenuItem className={`option-${_sprint.id}`} key={_sprint.id} onClick={handleClick} icon={icon} text={_sprint.name} />
        },
        [sprint]
    )

    if (!project)
        return (
            <NonIdealState
                className="board-no-project-found"
                icon={IconNames.SEARCH}
                title="No project found"
                description="You can create projects in the home page"
                action={<NavLink to="/">Go to home page</NavLink>}
            />
        )

    return (
        <div id="board">
            <Navbar>
                <Navbar.Group className="board-navbar" align={Alignment.CENTER}>
                    <Select
                        className="project-select"
                        items={projects}
                        onItemSelect={changeProject}
                        itemRenderer={projectItemRenderer}
                        itemPredicate={itemPredicate}
                        popoverProps={{ usePortal: false }}
                    >
                        <Button className="project-name" rightIcon="double-caret-vertical">
                            {project.name}
                        </Button>
                    </Select>
                    {sprint && (
                        <Select
                            className="sprint-select"
                            items={sprints}
                            onItemSelect={setSprint}
                            itemRenderer={sprintItemRenderer}
                            itemPredicate={itemPredicate}
                            popoverProps={{ usePortal: false }}
                        >
                            <Button className="sprint-name" rightIcon="double-caret-vertical">
                                {sprint.name}
                            </Button>
                        </Select>
                    )}
                </Navbar.Group>
            </Navbar>
            {!sprint && (
                <NonIdealState
                    className="board-no-sprint-found"
                    icon={IconNames.SEARCH}
                    title="No active sprint found"
                    description="You can create or activate sprints in the project page"
                    action={<NavLink to={`/projects/${project.id}`}>Go to project page</NavLink>}
                />
            )}
            {sprint && <TicketsTable projectId={project.id} sprintId={sprint.id} />}
        </div>
    )
}

export default Board
