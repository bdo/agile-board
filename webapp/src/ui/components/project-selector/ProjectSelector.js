import './ProjectSelector.css'

import PropTypes from 'prop-types'
import React from 'react'

import ProjectService from '../../../services/ProjectService'

class ProjectSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = { dropdownOpen: false, editorOpen: false, project: '', projects: [] }
    }

    async fetchProjects() {
        const projects = await ProjectService.list()
        this.setState({ projects })
        return projects
    }

    async save(e) {
        e.preventDefault()
        const { id, name, description } = this.state
        await ProjectService.save({ id, name, description })
        this.fetchProjects()
        this.closeEditor()
    }

    changeValue(id, name, description) {
        const { onChange } = this.props
        this.setState({ id, name, description, dropdownOpen: false })
        onChange(id)
    }

    toggle() {
        const { dropdownOpen } = this.state
        this.setState({ dropdownOpen: !dropdownOpen })
    }

    openEditor() {
        this.setState({ editorOpen: true })
    }

    closeEditor() {
        this.setState({ editorOpen: false })
    }

    async componentDidMount() {
        const projects = await this.fetchProjects()
        if (!projects.length) return
        const { id, name, description } = projects[0]
        this.changeValue(id, name, description)
    }

    renderTitle(name, description) {
        return (
            <React.Fragment>
                <div className="project-title">{name}</div>
                <div className="project-subtitle">{description}</div>
            </React.Fragment>
        )
    }

    render() {
        const { editorOpen, dropdownOpen, name, description, projects } = this.state
        return (
            <div className="project-selector">
                <div className="project-edit" onClick={this.openEditor.bind(this)}>
                    Edit project
                </div>
                <div className="project-dropdown">
                    <label>
                        <input type="checkbox" checked={dropdownOpen} onChange={this.toggle.bind(this)} />
                        <div>{this.renderTitle(name, description)}</div>
                        <div>{dropdownOpen ? <span>&#9650;</span> : <span>&#9660;</span>}</div>
                    </label>
                    {dropdownOpen && (
                        <ul>
                            {projects.map(({ id, name, description }) => (
                                <li key={id} onClick={this.changeValue.bind(this, id, name, description)}>
                                    {this.renderTitle(name, description)}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {editorOpen && (
                    <div className="project-editor" onClick={this.closeEditor.bind(this)}>
                        <form onSubmit={this.save.bind(this)} onClick={e => e.stopPropagation()}>
                            <div>
                                <input type="text" name="name" value={name} onChange={e => this.setState({ name: e.target.value })} />
                            </div>
                            <div>
                                <input type="text" name="description" value={description} onChange={e => this.setState({ description: e.target.value })} />
                            </div>
                            <div>
                                <button>Save</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        )
    }
}

ProjectSelector.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default ProjectSelector
