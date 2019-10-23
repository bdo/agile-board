import './Avatar.css'

import PropTypes from 'prop-types'
import React from 'react'

const Avatar = ({ user, onClick }) => <img className="avatar" src={`/images/avatar/${user.id}.png`} alt="" title={user.name} width={24} onClick={onClick} />

Avatar.propTypes = {
    user: PropTypes.object.isRequired,
    onClick: PropTypes.func
}

export default Avatar
