import { render } from '@testing-library/react'
import React from 'react'

import { _sprint } from '../../../fixtures/sprint'
import SprintPanel from './SprintPanel'

jest.mock('../ticket-tile/TicketTile', () => ({
    __esModule: true,
    default: function TicketTileMock() {
        return <div className="ticket-tile-mock" />
    },
    TicketTileDrag: function TicketTileDragMock() {
        return <div className="ticket-tile-drag-mock" />
    },
    TicketTileDrop: function TicketTileDropMock() {
        return <div className="ticket-tile-drop-mock" />
    }
}))

describe('SprintPanel', () => {
    it('Should show the panel', function() {
        const { container } = render(<SprintPanel sprint={_sprint} onRefreshSprints={jest.fn()} />)
        const panel = container.querySelector('.sprint-panel')
        const description = container.querySelector('.description')
        const tickets = container.querySelectorAll('.ticket-tile-drop-mock')
        expect(panel).not.toBeNull()
        expect(description.textContent).toBe(`walk${_sprint.description}`)
        expect(tickets).toHaveLength(2)
    })
})
