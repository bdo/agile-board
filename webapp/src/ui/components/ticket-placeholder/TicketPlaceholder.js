import './TicketPlaceholder.css'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { useDrag } from 'react-dnd'

const TicketPlaceholder = ({ children, className, onClick, ticket, editing }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'ticket', ticket },
        canDrag: () => !editing,
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })

    return (
        <div ref={drag} className={classnames('ticket-placeholder', className, { dragging: isDragging })} onClick={onClick}>
            {children}
        </div>
    )
}

TicketPlaceholder.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    ticket: PropTypes.object,
    editing: PropTypes.bool
}

export default TicketPlaceholder
