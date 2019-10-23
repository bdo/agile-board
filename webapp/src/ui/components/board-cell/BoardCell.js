import './BoardCell.css'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { useDrop } from 'react-dnd'

import Ticket from '../../components/ticket/Ticket'

const BoardCell = ({ priority, state, onMoveTicket, onSaveTicket, onDeleteTicket, ticket }) => {
    const dropProps = { accept: 'ticket', drop: item => onMoveTicket(item.ticket, priority, state), collect: monitor => ({ isOver: !!monitor.isOver() }) }
    const [{ isOver }, drop] = useDrop(dropProps)

    return (
        <React.Fragment ref={drop} className={classnames('drop', { dropping: isOver })}>
            {ticket.state === state && <Ticket ticket={ticket} onSave={onSaveTicket} onDelete={onDeleteTicket} />}
        </React.Fragment>
    )
}

BoardCell.propTypes = {
    priority: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    ticket: PropTypes.object.isRequired,
    onMoveTicket: PropTypes.func.isRequired,
    onSaveTicket: PropTypes.func.isRequired,
    onDeleteTicket: PropTypes.func.isRequired
}

export default BoardCell
