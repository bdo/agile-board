import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import TicketButtonBar from './TicketButtonBar'

describe('TicketButtonBar', () => {
    it('Should show the buttons', async () => {
        const { container } = render(<TicketButtonBar onDelete={jest.fn()} />)

        const buttons = container.querySelectorAll('.button-bar button')

        expect(buttons).toHaveLength(2)
    })

    it('Should call onDelete callback when clicking on delete button', async () => {
        const onDelete = jest.fn()
        const { container } = render(<TicketButtonBar onDelete={onDelete} />)

        const deleteButton = container.querySelector('.button-bar button:nth-child(2)')

        fireEvent.click(deleteButton)

        expect(onDelete).toHaveBeenCalled()
    })
})
