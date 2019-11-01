import './Board.css'

import { Alignment, Button, MenuItem, Navbar, NonIdealState } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Select } from '@blueprintjs/select'
import React, { useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import ProjectService from '../../../services/ProjectService'
import TicketsTable from '../../components/tickets-table/TicketsTable'

const itemPredicate = (query, { name = '', description = '' }, _index, exactMatch) => {
    const normalizedQuery = query.toLowerCase()
    const normalizedName = name.toLowerCase()
    const normalizedDescription = description.toLowerCase()

    return (exactMatch && normalizedQuery === normalizedName) || normalizedName.indexOf(query) > -1 || normalizedDescription.indexOf(query) > -1
}

const Board = () => {
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState(null)

    useEffect(() => {
        ProjectService.list({ archived: false })
            .then(projects => {
                setProject(projects[0])
                return projects
            })
            .then(setProjects)
    }, [])

    const itemRenderer = useCallback(
        (_project, { handleClick }) => {
            const icon = project.id === _project.id ? IconNames.TICK : IconNames.BLANK
            return <MenuItem className={`option-${_project.id}`} key={_project.id} onClick={handleClick} icon={icon} text={_project.name} />
        },
        [project]
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
                    <Select items={projects} onItemSelect={setProject} itemRenderer={itemRenderer} itemPredicate={itemPredicate} popoverProps={{ usePortal: false }}>
                        <Button className="project-name" rightIcon="double-caret-vertical">
                            {project.name}
                        </Button>
                    </Select>
                </Navbar.Group>
            </Navbar>
            <TicketsTable projectId={project.id} />
        </div>
    )
}

export default Board
