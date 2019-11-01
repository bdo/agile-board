import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'

import { _ticket } from '../../../fixtures/ticket'
import TicketService from '../../../services/TicketService'
import TicketEditor from './TicketEditor'

jest.mock('../ticket-assignees-editor/TicketAssigneesEditor', () => ({
    __esModule: true,
    default: function TicketAssigneesEditorMock() {
        return <div className="ticket-assignees-editor-editor-mock" />
    }
}))

jest.mock('../ticket-description-editor/TicketDescriptionEditor', () => ({
    __esModule: true,
    default: function TicketDescriptionEditorMock() {
        return <div className="ticket-description-editor-mock" />
    }
}))

jest.mock('../ticket-points-editor/TicketPointsEditor', () => ({
    __esModule: true,
    default: function TicketPointsEditorMock() {
        return <div className="ticket-points-editor-mock" />
    }
}))

jest.mock('../ticket-summary-editor/TicketSummaryEditor', () => ({
    __esModule: true,
    default: function TicketSummaryEditorMock() {
        return <div className="ticket-summary-editor-mock" />
    }
}))

jest.mock('../ticket-type-editor/TicketTypeEditor', () => ({
    __esModule: true,
    default: function TicketTypeEditorMock() {
        return <div className="ticket-type-editor-mock" />
    }
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
