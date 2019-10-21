import './ProjectEditor.css'

import PropTypes from 'prop-types'
import React from 'react'

class ProjectEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: props.name || '', description: props.description || '' }
    }

    save() {
        const { onSave } = this.props
        const { name, props } = this.state
        onSave(name, props)
    }

    render() {
        const { onClose } = this.props
        const { name, description } = this.props
        return (
            <div className="project-editor" onClick={onClose}>
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
        )
    }
}

ProjectEditor.propTypes = {
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    name: PropTypes.string,
    description: PropTypes.string
}

export default ProjectEditor
