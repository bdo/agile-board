import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import ProjectService from '../../../services/ProjectService'

const Home = () => {
    const [project, setProject] = useState([])

    useEffect(() => {
        ProjectService.list().then(setProject)
    }, [])

    return (
        <ul>
            {project.map(project => (
                <li key={project.id}>
                    <NavLink to={`/${project.id}`}>
                        <b>{project.name}</b> {project.description}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}

export default Home
