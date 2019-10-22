import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
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
        <form onSubmit={onSubmit}>
            <FormGroup>
                <InputGroup id="project-name" placeholder="Project name" name="name" value={name} onChange={e => setName(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <InputGroup id="project-description" placeholder="Project description" name="description" value={description} onChange={e => setDescription(e.target.value)} />
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
