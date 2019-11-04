import { fireEvent, render } from '@testing-library/react'
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

jest.mock('../../components/sprint-form/SprintForm', () => ({
    __esModule: true,
    default: function SprintFormMock() {
        return <div className="sprint-form-mock" />
    }
}))

describe('SprintPanel', () => {
    it('Should show the panel', function() {
        const { container } = render(<SprintPanel sprint={_sprint} onRefreshSprints={jest.fn()} />)
        const panel = container.querySelector('.sprint-panel')
        const name = container.querySelector('.name')
        const tickets = container.querySelectorAll('.ticket-tile-drop-mock')
        expect(panel).not.toBeNull()
        expect(name.textContent).toBe(`walk${_sprint.name}edit`)
        expect(tickets).toHaveLength(2)
    })

    it('Should open the sprint form when clicking on sprint menu', async () => {
        const { container } = render(<SprintPanel sprint={_sprint} onRefreshSprints={jest.fn()} />)
        const name = container.querySelector('.name')
        fireEvent.click(name)
        const sprintForm = container.querySelector('.sprint-form-mock')
        expect(sprintForm).not.toBeNull()
    })
})
