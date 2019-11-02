import { render } from '@testing-library/react'
import React from 'react'

import { _ticket } from '../../../fixtures/ticket'
import { renderInDnd } from '../../../test-render'
import TicketTile, { TicketTileDrag, TicketTileDrop } from './TicketTile'

describe('TicketTile', () => {
    it('Should show the tile', function() {
        const { container } = render(<TicketTile ticket={_ticket} onRefreshTickets={jest.fn()} />)
        const tile = container.querySelector('.ticket-tile')
        const tileSummary = container.querySelector('.summary b')
        const tileDescription = container.querySelector('.description')
        const tilePoints = container.querySelector('.points')
        expect(tile).not.toBeNull()
        expect(tileSummary.textContent).toBe(_ticket.summary)
        expect(tileDescription.textContent).toBe('')
        expect(tilePoints.textContent).toBe(`${_ticket.points}`)
    })
})

describe('TicketTileDrop', () => {
    it('Should show the children', () => {
        const { container } = renderInDnd(
            <TicketTileDrop sprintId={1} priority={1} onMoveTicket={jest.fn()}>
                Children
            </TicketTileDrop>
        )
        expect(container.firstChild.textContent).toBe('Children')
    })
})

describe('TicketTileDrag', () => {
    it('Should show the children', () => {
        const { container } = renderInDnd(<TicketTileDrag ticket={_ticket}>Children</TicketTileDrag>)
        expect(container.firstChild.textContent).toBe('Children')
    })
})
