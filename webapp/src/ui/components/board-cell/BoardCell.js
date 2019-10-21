import './BoardCell.css'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { useDrop } from 'react-dnd'

import Ticket from '../../components/ticket/Ticket'

const BoardCell = ({ priority, state, moveTicket, saveTicket, deleteTicket, ticket }) => {
    const dropProps = { accept: 'ticket', drop: item => moveTicket(item.ticket, priority, state), collect: monitor => ({ isOver: !!monitor.isOver() }) }
    const [{ isOver }, drop] = useDrop(dropProps)

    return (
        <div ref={drop} className={classnames('cell', { dropping: isOver })}>
            {ticket.state === state && <Ticket ticket={ticket} onSave={saveTicket} onDelete={deleteTicket} />}
        </div>
    )
}

BoardCell.propTypes = {
    priority: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    moveTicket: PropTypes.func.isRequired,
    saveTicket: PropTypes.func.isRequired,
    deleteTicket: PropTypes.func.isRequired,
    ticket: PropTypes.object.isRequired
}

export default BoardCell
