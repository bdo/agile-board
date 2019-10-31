import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import TicketType from './TicketType'

describe('TicketType', () => {
    it('Should show the select', async () => {
        const { container } = render(<TicketType type="story" onChange={jest.fn()} />)
        const input = container.querySelector('.ticket-type-editor input')
        expect(input).not.toBeNull()
        expect(input.value).toBe('story')
    })

    it('Should call onChange callback when changing value', async () => {
        const onChange = jest.fn()
        const { container } = render(<TicketType type="story" onChange={onChange} />)
        const input = container.querySelector('.ticket-type-editor input')
        fireEvent.click(input)
        const option = container.querySelector('.option-task')
        fireEvent.click(option)
        expect(onChange).toHaveBeenCalledWith('type', 'task')
    })
})
