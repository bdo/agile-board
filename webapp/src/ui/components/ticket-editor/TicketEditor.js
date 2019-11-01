import './TicketEditor.css'

import { Button, Classes, Intent, Overlay } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'

import TicketService from '../../../services/TicketService'
import TicketAssigneesEditor from '../ticket-assignees-editor/TicketAssigneesEditor'
import TicketDescriptionEditor from '../ticket-description-editor/TicketDescriptionEditor'
import TicketPointsEditor from '../ticket-points-editor/TicketPointsEditor'
import TicketSummaryEditor from '../ticket-summary-editor/TicketSummaryEditor'
import TicketTypeEditor from '../ticket-type-editor/TicketTypeEditor'

const TicketEditor = ({ ticket: { assignees, points, type, summary, description, ..._ticket }, onEndEditing, onRefreshTickets }) => {
    const [ticket, setTicket] = useState({ assignees, points, type, summary, description, ..._ticket })
    const [loading, setLoading] = useState(false)

    const onChange = useCallback(
        (prop, value) => {
            setTicket({ ...ticket, [prop]: value })
        },
        [ticket]
    )

    const onSubmit = useCallback(
        e => {
            e.preventDefault()
            setLoading(true)
            TicketService.save(ticket)
                .then(setLoading.bind(this, false))
                .then(onEndEditing)
                .then(onRefreshTickets)
        },
        [ticket, onEndEditing, onRefreshTickets]
    )

    const onDelete = useCallback(() => {
        setLoading(true)
        TicketService.delete(ticket.id)
            .then(setLoading.bind(this, false))
            .then(onEndEditing)
            .then(onRefreshTickets)
    }, [ticket.id, onEndEditing, onRefreshTickets])

    return (
        <Overlay isOpen onClose={onEndEditing} className={classnames('ticket-overlay', Classes.OVERLAY_SCROLL_CONTAINER)} usePortal={false}>
            <div className={classnames('ticket-editor', ticket.type)}>
                <form onSubmit={onSubmit}>
                    <div className="ticket-top">
                        <TicketAssigneesEditor assignees={ticket.assignees} onChange={onChange} />
                        <TicketTypeEditor type={ticket.type} onChange={onChange} />
                        <TicketPointsEditor points={ticket.points} onChange={onChange} />
                    </div>
                    <div className="ticket-bottom">
                        <TicketSummaryEditor summary={ticket.summary} onChange={onChange} />
                        <TicketDescriptionEditor description={ticket.description} onChange={onChange} />
                    </div>
                    <div className="button-bar">
                        <Button type="submit" icon={IconNames.TICK} intent={Intent.SUCCESS} loading={loading}>
                            Save
                        </Button>
                        <Button icon={IconNames.TRASH} intent={Intent.DANGER} onClick={onDelete} loading={loading}>
                            Delete
                        </Button>
                    </div>
                </form>
            </div>
        </Overlay>
    )
}

TicketEditor.propTypes = {
    ticket: PropTypes.object.isRequired,
    onEndEditing: PropTypes.func.isRequired,
    onRefreshTickets: PropTypes.func.isRequired
}

export default TicketEditor
