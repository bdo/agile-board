import './Header.css'

import PropTypes from 'prop-types'
import React from 'react'

import ProjectSelector from '../project-selector/ProjectSelector'

const Header = ({ projectId, onSelectProject }) => (
    <header>
        <ProjectSelector value={projectId} onChange={onSelectProject} />
    </header>
)

Header.propTypes = {
    projectId: PropTypes.number,
    onSelectProject: PropTypes.func.isRequired
}

export default Header
