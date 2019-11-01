import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'

import { _project } from '../../../fixtures/project'
import { _ticket } from '../../../fixtures/ticket'
import TicketService from '../../../services/TicketService'
import TicketEditor from './TicketEditor'

jest.mock('../ticket-assignees/TicketAssignees', () => ({
    __esModule: true,
    default: () => <div className="ticket-assignees-mock" />
}))

jest.mock('../ticket-description/TicketDescription', () => ({
    __esModule: true,
    default: () => <div className="ticket-description-mock" />
}))

jest.mock('../ticket-points/TicketPoints', () => ({
    __esModule: true,
    default: () => <div className="ticket-points-mock" />
}))

jest.mock('../ticket-summary/TicketSummary', () => ({
    __esModule: true,
    default: () => <div className="ticket-summary-mock" />
}))

jest.mock('../ticket-type/TicketType', () => ({
    __esModule: true,
    default: () => <div className="ticket-type-mock" />
}))

jest.mock('../../../services/TicketService')

describe('TicketEditor', () => {
    beforeEach(() => {
        TicketService.save.mockResolvedValue(true)
        TicketService.delete.mockResolvedValue(true)
    })

    it('Should show the ticket editor', function() {
        const { container } = render(<TicketEditor ticket={_ticket} onEndEditing={jest.fn()} onRefreshTickets={jest.fn()} />)
        const editor = container.querySelector('.ticket-editor')
        expect(editor).not.toBeNull()
    })

    it('Should call onEndEditing and onRefreshTickets when submiting form', async function() {
        const onEndEditing = jest.fn()
        const onRefreshTickets = jest.fn()
        const { container } = render(<TicketEditor ticket={_ticket} onEndEditing={onEndEditing} onRefreshTickets={onRefreshTickets} />)
        const form = container.querySelector('.ticket-editor form')
        await act(async () => fireEvent.submit(form))
        expect(onEndEditing).toHaveBeenCalled()
        expect(onRefreshTickets).toHaveBeenCalled()
    })

    it('Should call onEndEditing and onRefreshTickets when deleting ticket', async function() {
        const onEndEditing = jest.fn()
        const onRefreshTickets = jest.fn()
        const { container } = render(<TicketEditor ticket={_ticket} onEndEditing={onEndEditing} onRefreshTickets={onRefreshTickets} />)
        const button = container.querySelector('.ticket-editor .button-bar button:nth-child(2)')
        await act(async () => fireEvent.click(button))
        expect(onEndEditing).toHaveBeenCalled()
        expect(onRefreshTickets).toHaveBeenCalled()
    })
})
