import PropTypes from 'prop-types'
import React from 'react'

import ProjectService from '../../../services/ProjectService'

class ProjectSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = { projects: [] }
    }

    async componentDidMount() {
        const { onChange } = this.props
        const projects = await ProjectService.list()
        this.setState({ projects })
        if (projects.length) onChange(projects[0].id)
    }

    onChange(e) {
        const { onChange } = this.props
        onChange(parseInt(e.target.value, 10))
    }

    render() {
        const { value } = this.props
        const { projects } = this.state
        return (
            <select value={value || ''} onChange={this.onChange.bind(this)}>
                {projects.map(project => (
                    <option key={project.id} value={project.id}>
                        {project.name} | {project.description}
                    </option>
                ))}
            </select>
        )
    }
}

ProjectSelector.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default ProjectSelector
