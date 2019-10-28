import React from 'react'
import { act } from 'react-dom/test-utils'

import { _ticket } from '../../../fixtures/ticket'
import TicketService from '../../../services/TicketService'
import TicketsTable, { TicketsTableCell } from './TicketsTable'

jest.mock('../../../services/TicketService', () => ({
    list: jest.fn(),
    save: jest.fn()
}))

describe('TicketsTable', () => {
    let resolve
    beforeEach(() => {
        TicketService.list.mockReturnValue(
            new Promise(_resolve => {
                resolve = _resolve
            })
        )
    })

    it('Should show the spinner', async () => {
        const { container } = renderInRouterAndDnd(<TicketsTable projectId={1} />)

        const spinner = container.querySelector('.tickets-table-spinner')
        const noResult = container.querySelector('.tickets-table-no-results')
        const table = container.querySelector('.tickets-table')

        expect(spinner).not.toBeNull()
        expect(noResult).toBeNull()
        expect(table).toBeNull()
    })

    it('Should show the no result message', async () => {
        const { container } = renderInRouterAndDnd(<TicketsTable projectId={1} />)

        await act(async () => {
            resolve([])
        })

        const spinner = container.querySelector('.tickets-table-spinner')
        const noResult = container.querySelector('.tickets-table-no-results')
        const table = container.querySelector('.tickets-table')

        expect(spinner).toBeNull()
        expect(noResult).not.toBeNull()
        expect(table).toBeNull()
    })

    it('Should show the table', async () => {
        const { container } = renderInRouterAndDnd(<TicketsTable projectId={1} />)

        await act(async () => {
            resolve([_ticket])
        })

        const spinner = container.querySelector('.tickets-table-spinner')
        const noResult = container.querySelector('.tickets-table-no-results')
        const table = container.querySelector('.tickets-table')

        expect(spinner).toBeNull()
        expect(noResult).toBeNull()
        expect(table).not.toBeNull()
    })
})

describe('TicketsTableCell', () => {
    const template = document.createElement('template')
    template.innerHTML = '<table><tbody><tr></tr></tbody></table>'
    const options = {
        container: template.content.querySelector('tr')
    }

    it('Should be empty when ticket state and cell state differ', async () => {
        const { container } = renderInDnd(<TicketsTableCell priority={1} state="state1" ticket={_ticket} onMoveTicket={jest.fn()} onRefreshTickets={jest.fn()} />, options)

        const cell = container.querySelector('.drop')
        const ticket = container.querySelector('.ticket')

        expect(cell).not.toBeNull()
        expect(ticket).toBeNull()
    })

    it('Should contain ticket when ticket state and cell state are equal', async () => {
        const { container } = renderInDnd(<TicketsTableCell priority={1} state={_ticket.state} ticket={_ticket} onMoveTicket={jest.fn()} onRefreshTickets={jest.fn()} />, options)

        const cell = container.querySelector('.drop')
        const ticket = container.querySelector('.ticket')

        expect(cell).not.toBeNull()
        expect(ticket).not.toBeNull()
    })
})
