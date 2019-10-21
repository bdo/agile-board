import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import ProjectService from './../../../services/ProjectService'

const Project = () => {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        id &&
            ProjectService.get(id).then(project => {
                console.log(typeof project)
                setName(project.name)
                setDescription(project.description)
            })
    }, [id])

    const changeProjectName = useCallback(e => {
        setName(e.target.value)
    }, [])

    const changeProjectDescription = useCallback(e => {
        setDescription(e.target.value)
    }, [])

    const save = useCallback(
        e => {
            e.preventDefault()
            ProjectService.save({ id, name, description })
        },
        [id, name, description]
    )

    return (
        <form onSubmit={save}>
            <input type="text" name="name" value={name} onChange={changeProjectName} />
            <input type="text" name="description" value={description} onChange={changeProjectDescription} />
            <button>Save</button>
        </form>
    )
}

export default Project
