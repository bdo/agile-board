import './Home.css'

import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import ProjectService from '../../../services/ProjectService'

const Home = () => {
    const [project, setProject] = useState([])

    useEffect(() => {
        ProjectService.list().then(setProject)
    }, [])

    return (
        <ul className="home">
            {project.map(project => (
                <li key={project.id}>
                    <NavLink to={`/project/${project.id}`}>(Edit)</NavLink>
                    <NavLink to={`/board/${project.id}`}>
                        <b>{project.name}</b> {project.description}
                    </NavLink>
                </li>
            ))}
            <li>
                <NavLink to={`/project`}>(Add)</NavLink>
            </li>
        </ul>
    )
}

export default Home
