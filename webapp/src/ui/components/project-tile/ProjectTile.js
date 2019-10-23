import './ProjectTile.css'

import { Card, Elevation, H5 } from '@blueprintjs/core'
import classnames from 'classnames'
import { PropTypes } from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

const ProjectTile = ({ project }) => (
    <NavLink to={`/projects/${project.id}`} className={classnames('project-tile', { archived: project.archived })}>
        <Card elevation={Elevation.TWO} interactive>
            <H5>{project.name}</H5>
            <p>{project.description}</p>
        </Card>
    </NavLink>
)

ProjectTile.propTypes = {
    project: PropTypes.object.isRequired
}

export default ProjectTile
