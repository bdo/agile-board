import './ProjectForm.css'

import { Button, Classes, Dialog, FormGroup, InputGroup, Intent, TextArea } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'

const ProjectForm = ({ project, onSave, onClose }) => {
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

    const onArchive = useCallback(() => {
        onSave({ ...project, archived: true, name, description })
    }, [project, name, description, onSave])

    return (
        <Dialog isOpen onClose={onClose} backdropProps={{ className: 'project-form-backdrop' }} usePortal={false}>
            <div className={Classes.DIALOG_BODY}>
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
                        {project.id && (
                            <Button loading={loading} intent={Intent.DANGER} onClick={onArchive}>
                                Archive
                            </Button>
                        )}
                    </FormGroup>
                </form>
            </div>
        </Dialog>
    )
}

ProjectForm.propTypes = {
    project: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ProjectForm
