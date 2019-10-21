import './ProjectSelector.css'

import PropTypes from 'prop-types'
import React from 'react'

import ProjectService from '../../../services/ProjectService'

const ProjectSelectorTitle = ({ project }) => (
    <div className="project-selector-title">
        <div className="title">{project.name}</div>
        <div className="subtitle">{project.description}</div>
    </div>
)

class ProjectSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = { dropdownOpen: false, projects: [] }
    }

    async fetchProjects() {
        const { onChange } = this.props
        const projects = await ProjectService.list()
        this.setState({ projects })
        if (!projects.length) return
        onChange(projects[0])
    }

    toggle() {
        const { dropdownOpen } = this.state
        this.setState({ dropdownOpen: !dropdownOpen })
    }

    changeProject(project) {
        const { onChange } = this.props
        onChange(project)
        this.toggle()
    }

    componentDidMount() {
        this.fetchProjects()
    }

    render() {
        const { project } = this.props
        const { dropdownOpen, projects } = this.state
        if (!project) return null
        return (
            <div className="project-selector">
                <label>
                    <input type="checkbox" checked={dropdownOpen} onChange={this.toggle.bind(this)} />
                    <ProjectSelectorTitle project={project} />
                    <div>{dropdownOpen ? <span>&#9650;</span> : <span>&#9660;</span>}</div>
                </label>
                {dropdownOpen && (
                    <ul>
                        {projects.map(project => (
                            <li key={project.id} onClick={this.changeProject.bind(this, project)}>
                                <ProjectSelectorTitle project={project} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )
    }
}

ProjectSelector.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default ProjectSelector
