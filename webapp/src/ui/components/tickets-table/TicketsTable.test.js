import React from 'react'
import { DndProvider } from 'react-dnd-cjs'
import HTML5Backend from 'react-dnd-html5-backend-cjs'
import { act } from 'react-dom/test-utils'

import TicketService from '../../../services/TicketService'
import TicketsTable from './TicketsTable'

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
        const { container } = renderInRouter(
            <DndProvider backend={HTML5Backend}>
                <TicketsTable projectId={1} />
            </DndProvider>
        )

        const spinner = container.querySelector('.tickets-table-spinner')
        const noResult = container.querySelector('.tickets-table-no-results')
        const table = container.querySelector('.tickets-table')

        expect(spinner).toBeInTheDocument()
        expect(noResult).toBeNull()
        expect(table).toBeNull()
    })

    it('Should show the no result message', async () => {
        const { container } = renderInRouter(
            <DndProvider backend={HTML5Backend}>
                <TicketsTable projectId={1} />
            </DndProvider>
        )

        await act(async () => {
            resolve([])
        })

        const spinner = container.querySelector('.tickets-table-spinner')
        const noResult = container.querySelector('.tickets-table-no-results')
        const table = container.querySelector('.tickets-table')

        expect(spinner).toBeNull()
        expect(noResult).toBeInTheDocument()
        expect(table).toBeNull()
    })

    it('Should show the table', async () => {
        const { container } = renderInRouter(
            <DndProvider backend={HTML5Backend}>
                <TicketsTable projectId={1} />
            </DndProvider>
        )

        await act(async () => {
            resolve([{ id: 1, priority: 1, state: 'state1', assignees: [] }])
        })

        const spinner = container.querySelector('.tickets-table-spinner')
        const noResult = container.querySelector('.tickets-table-no-results')
        const table = container.querySelector('.tickets-table')

        expect(spinner).toBeNull()
        expect(noResult).toBeNull()
        expect(table).toBeInTheDocument()
    })
})
