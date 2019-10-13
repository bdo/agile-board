import './TicketPlaceholder.css'

import classnames from 'classnames'
import React from 'react'

const TicketPlaceholder = ({ children, className, onClick }) => (
    <div className={classnames('ticket-placeholder', className)} onClick={onClick}>
        {children}
    </div>
)

export default TicketPlaceholder
