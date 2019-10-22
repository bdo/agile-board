import './ProjectTile.css'

import { Card, Elevation, H5, Icon } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { PropTypes } from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

const ProjectTile = ({ project, onEdit }) => (
    <Card elevation={Elevation.TWO} className="project-tile">
        <Icon icon={IconNames.EDIT} onClick={onEdit} className="icon" />
        <H5>
            <NavLink to={`/${project.id}`}>{project.name}</NavLink>{' '}
        </H5>
        <p>{project.description}</p>
    </Card>
)

ProjectTile.propTypes = {
    project: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired
}

export default ProjectTile
