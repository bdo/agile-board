import './Avatar.css'

import { Colors } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

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

const Avatar = ({ user }) => {
    const [error, setError] = useState(false)
    const [loaded, setLoaded] = useState(false)

    const src = `/images/avatar/${user.id}.png`

    useEffect(() => {
        const img = new Image()
        img.onload = setLoaded.bind(this, true)
        img.onerror = setError.bind(this, true)
        img.src = src
    }, [src])

    const userInitial = (user.name || {})[0]
    const backgroundColor = COLORS[userInitial.charCodeAt(0) % COLORS.length]

    if (loaded && !error) return <img className="avatar" src={src} alt="" title={user.name} />

    return (
        <div className="avatar-fallback" style={{ backgroundColor }}>
            {userInitial}
        </div>
    )
}

Avatar.propTypes = {
    user: PropTypes.object.isRequired
}

export default Avatar
