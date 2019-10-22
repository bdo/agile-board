import './ProjectForm.css'

import { Button, FormGroup, InputGroup, Intent, TextArea } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'

const ProjectForm = ({ project, onSave }) => {
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [loading, setLoading] = useState(false)

    const onSubmit = useCallback(
        e => {
            setLoading(true)
            e.preventDefault()
            onSave({ ...project, name, description })
        },
        [project, name, description, onSave]
    )

    return (
        <form className="project-form" onSubmit={onSubmit}>
            <FormGroup label="Project name" labelFor="project-name">
                <InputGroup id="project-name" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="My marvelous project" />
            </FormGroup>
            <FormGroup label="Project description" labelFor="project-description">
                <TextArea
                    id="project-description"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="This project is absolutely marvelous!"
                    rows={5}
                    fill
                    growVertically={false}
                />
            </FormGroup>
            <FormGroup>
                <Button type="submit" loading={loading} intent={Intent.PRIMARY}>
                    Save
                </Button>
            </FormGroup>
        </form>
    )
}

ProjectForm.propTypes = {
    project: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired
}

export default ProjectForm
