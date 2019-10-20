import './Header.css'

import PropTypes from 'prop-types'
import React from 'react'

import ProjectSelector from '../project-selector/ProjectSelector'

const Header = ({ onSelectProject }) => (
    <header>
        <ProjectSelector onChange={onSelectProject} />
    </header>
)

Header.propTypes = {
    onSelectProject: PropTypes.func.isRequired
}

export default Header
