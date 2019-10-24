import './TicketButtonBar.css'

import { Button, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import PropTypes from 'prop-types'
import React from 'react'

const TicketButtonBar = ({ onDelete }) => {
    return (
        <div className="button-bar">
            <Button type="submit" icon={IconNames.TICK} intent={Intent.SUCCESS}>
                Save
            </Button>
            <Button icon={IconNames.TRASH} intent={Intent.DANGER} onClick={onDelete}>
                Delete
            </Button>
        </div>
    )
}

TicketButtonBar.propTypes = {
    onDelete: PropTypes.func.isRequired
}

export default TicketButtonBar
