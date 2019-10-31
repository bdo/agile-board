import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import TicketSummary from './TicketSummary'

describe('TicketSummary', () => {
    it('Should show the input', async () => {
        const { container } = render(<TicketSummary summary="Hello world" onChange={jest.fn()} />)
        const input = container.querySelector('.ticket-summary-editor input')
        expect(input).not.toBeNull()
        expect(input.value).toBe('Hello world')
    })

    it('Should call onChange callback when changing value', async () => {
        const onChange = jest.fn()
        const { container } = render(<TicketSummary summary="Hello world" onChange={onChange} />)
        const input = container.querySelector('.ticket-summary-editor input')
        fireEvent.change(input, { target: { value: 'Hello people' } })
        expect(onChange).toHaveBeenCalledWith('summary', 'Hello people')
    })
})
