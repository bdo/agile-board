import './ProjectSelector.css'

import PropTypes from 'prop-types'
import React from 'react'

import ProjectService from '../../../services/ProjectService'

class ProjectSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = { open: false, project: '', projects: [] }
    }

    async componentDidMount() {
        const projects = await ProjectService.list()
        this.setState({ projects })
        if (projects.length) this.changeValue(projects[0])
    }

    changeValue(project) {
        const { onChange } = this.props
        this.setState({ project, open: false })
        onChange(project.id)
    }

    toggle() {
        const { open } = this.state
        this.setState({ open: !open })
    }

    render() {
        const { open, project, projects } = this.state
        return (
            <div className="project-selector">
                <label>
                    <input type="checkbox" checked={open} onChange={this.toggle.bind(this)} />
                    <b>{project.name}</b> | {project.description}
                </label>
                {open && (
                    <ul>
                        {projects.map(project => (
                            <li key={project.id} onClick={this.changeValue.bind(this, project)}>
                                <b>{project.name}</b> | {project.description}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )
    }
}

ProjectSelector.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default ProjectSelector
