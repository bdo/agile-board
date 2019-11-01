import { render } from '@testing-library/react'
import React from 'react'

import { _ticket } from '../../../fixtures/ticket'
import TicketTile from './TicketTile'

describe('TicketTile', () => {
    it('Should show the tile', function() {
        const { container } = render(<TicketTile ticket={_ticket} />)
        const tile = container.querySelector('.ticket-tile')
        const tileSummary = container.querySelector('.ticket-tile h5')
        const tileDescription = container.querySelector('.ticket-tile p')
        const tilePoints = container.querySelector('.ticket-tile-points')
        expect(tile).not.toBeNull()
        expect(tileSummary.textContent).toBe(_ticket.summary)
        expect(tileDescription.textContent).toBe('')
        expect(tilePoints.textContent).toBe(`${_ticket.points}`)
    })
})
