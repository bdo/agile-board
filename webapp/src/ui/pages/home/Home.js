import React from 'react'
import { NavLink } from 'react-router-dom'

import ProjectService from '../../../services/ProjectService'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { projects: [] }
    }

    async componentDidMount() {
        const projects = await ProjectService.list()
        this.setState({ projects })
    }

    render() {
        const { projects } = this.state
        return (
            <ul>
                {projects.map(project => (
                    <li>
                        <NavLink to={`/${project.id}`}>
                            <b>{project.name}</b> {project.description}
                        </NavLink>
                    </li>
                ))}
            </ul>
        )
    }
}

export default Home
