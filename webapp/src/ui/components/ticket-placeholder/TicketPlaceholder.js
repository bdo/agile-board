import './TicketPlaceholder.css'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const TicketPlaceholder = ({ children, className, onClick }) => (
    <div className={classnames('ticket-placeholder', className)} onClick={onClick}>
        {children}
    </div>
)

TicketPlaceholder.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
}

export default TicketPlaceholder
