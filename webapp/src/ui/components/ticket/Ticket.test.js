import { fireEvent } from '@testing-library/react'
import React from 'react'

import { _ticket } from '../../../fixtures/ticket'
import { renderInDnd } from '../../../test-render'
import Ticket from './Ticket'

jest.mock('../ticket-editor/TicketEditor', () => ({
    __esModule: true,
    default: function TicketEditorMock() {
        return <div className="ticket-editor-mock" />
    }
}))

jest.mock('../avatar/Avatar', () => ({
    __esModule: true,
    default: function AvatarMock() {
        return <div className="avatar-mock" />
    }
}))

describe('Ticket', () => {
    it('Should show the ticket', function() {
        const { container } = renderInDnd(<Ticket ticket={_ticket} onRefreshTickets={jest.fn()} />)
        const ticket = container.querySelector('.ticket')
        expect(ticket).not.toBeNull()
    })

    it('Should correctly init the ticket', function() {
        const { container } = renderInDnd(<Ticket ticket={_ticket} onRefreshTickets={jest.fn()} />)
        const assignees = container.querySelector('.ticket .assignees')
        const points = container.querySelector('.ticket .points')
        const summary = container.querySelector('.ticket .summary')
        expect(assignees.querySelectorAll('.avatar-mock')).toHaveLength(1)
        expect(points.textContent).toBe(`${_ticket.points}`)
        expect(summary.textContent).toBe(_ticket.summary)
    })

    it('Should show the editor when clicking on ticket', function() {
        const { container } = renderInDnd(<Ticket ticket={_ticket} onRefreshTickets={jest.fn()} />)
        const ticket = container.querySelector('.ticket')
        fireEvent.click(ticket)
        const ticketEditor = container.querySelector('.ticket-editor-mock')
        expect(ticketEditor).not.toBeNull()
    })
})
