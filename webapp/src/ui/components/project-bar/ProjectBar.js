import './ProjectBar.css'

import PropTypes from 'prop-types'
import React from 'react'

import ProjectService from '../../../services/ProjectService'
import ProjectEditor from '../project-editor/ProjectEditor'
import ProjectSelector from '../project-selector/ProjectSelector'

class ProjectBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { editorOpen: false, project: null }
    }

    async save(e) {
        e.preventDefault()
        const { id, name, description } = this.state
        await ProjectService.save({ id, name, description })
        this.fetchProjects()
        this.closeEditor()
    }

    selectProject(project) {
        const { onSelectProject } = this.props
        this.setState({ project })
        onSelectProject(project.id)
    }

    openEditor() {
        this.setState({ editorOpen: true })
    }

    closeEditor() {
        this.setState({ editorOpen: false })
    }

    render() {
        const { editorOpen, project } = this.state
        return (
            <header>
                <div className="project-edit" onClick={this.openEditor.bind(this)}>
                    Edit project
                </div>
                <ProjectSelector onChange={this.selectProject.bind(this)} project={project} />
                {editorOpen && <ProjectEditor onClose={this.closeEditor.bind(this)} onSave={this.save.bind(this)} name={project.name} description={project.description} />}
            </header>
        )
    }
}

ProjectBar.propTypes = {
    onSelectProject: PropTypes.func.isRequired
}

export default ProjectBar
