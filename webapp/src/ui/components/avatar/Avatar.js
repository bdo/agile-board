import './Avatar.css'

import { Colors } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const COLORS = [
    Colors.BLUE1,
    Colors.GREEN1,
    Colors.ORANGE1,
    Colors.RED1,
    Colors.VERMILION1,
    Colors.ROSE1,
    Colors.VIOLET1,
    Colors.INDIGO1,
    Colors.COBALT1,
    Colors.TURQUOISE1,
    Colors.FOREST1,
    Colors.LIME1,
    Colors.GOLD1,
    Colors.SEPIA1
]

const Avatar = ({ user, onClick }) => {
    const [error, setError] = useState(false)

    if (error) {
        const userInitial = (user.name || {})[0]
        const backgroundColor = COLORS[userInitial.charCodeAt(0) % COLORS.length]
        return (
            <span className="avatar-fallback" style={{ backgroundColor }}>
                {userInitial}
            </span>
        )
    }

    return <img className="avatar" src={`/images/avatar/${user.id}.png`} onError={setError.bind(this, true)} alt="" title={user.name} onClick={onClick} />
}

Avatar.propTypes = {
    user: PropTypes.object.isRequired,
    onClick: PropTypes.func
}

export default Avatar
