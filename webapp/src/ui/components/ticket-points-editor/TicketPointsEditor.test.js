import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import TicketPointsEditor from './TicketPointsEditor'

describe('TicketPointsEditor', () => {
    it('Should show the select', async () => {
        const { container } = render(<TicketPointsEditor points={5} onChange={jest.fn()} />)
        const input = container.querySelector('.ticket-points-editor input')
        expect(input).not.toBeNull()
        expect(input.value).toBe('5')
    })

    it('Should call onChange callback when changing value', async () => {
        const onChange = jest.fn()
        const { container } = render(<TicketPointsEditor points={2} onChange={onChange} />)
        const input = container.querySelector('.ticket-points-editor input')
        fireEvent.click(input)
        const option = container.querySelector('.option-2')
        fireEvent.click(option)
        expect(onChange).toHaveBeenCalledWith('points', 2)
    })
})
