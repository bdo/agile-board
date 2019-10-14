import PropTypes from 'prop-types'
import React from 'react'

const Avatar = ({ user, size, onClick }) => <img src={`/images/avatar/${user.id}.png`} alt={user.name} title={user.name} width={size} onClick={onClick} />

Avatar.propTypes = {
    user: PropTypes.object.isRequired,
    size: PropTypes.number.isRequired,
    onClick: PropTypes.func
}

export default Avatar
