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

const Avatar = ({ user, onClick }) => {
    const [error, setError] = useState(false)
    const [loaded, setLoaded] = useState(false)

    const imgRef = React.createRef()

    useEffect(() => {
        const img = imgRef.current
        if (img && img.complete) setLoaded(true)
    }, [imgRef])

    const userInitial = (user.name || {})[0]
    const backgroundColor = COLORS[userInitial.charCodeAt(0) % COLORS.length]

    const img = (
        <img
            ref={imgRef}
            className="avatar"
            src={`/images/avatar/${user.id}.png`}
            onError={setError.bind(this, true)}
            onLoad={setLoaded.bind(this, true)}
            alt=""
            title={user.name}
            onClick={onClick}
        />
    )

    if (loaded && !error) return img

    return (
        <div className="avatar-fallback" style={{ backgroundColor }}>
            {!loaded && img}
            {userInitial}
        </div>
    )
}

Avatar.propTypes = {
    user: PropTypes.object.isRequired,
    onClick: PropTypes.func
}

export default Avatar
