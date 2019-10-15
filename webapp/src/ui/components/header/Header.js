import './Header.css'

import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = ({ projectName }) => (
    <header>
        <NavLink to="/">Home</NavLink>
        <span className="project-name">{projectName}</span>
    </header>
)

Header.propTypes = {
    projectName: PropTypes.string.isRequired
}

export default Header
