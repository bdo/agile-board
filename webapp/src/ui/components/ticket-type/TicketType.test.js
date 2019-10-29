import { render } from '@testing-library/react'
import React from 'react'
import { Simulate, act } from 'react-dom/test-utils'

import TicketType from './TicketType'

describe('TicketsType', () => {
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

        act(() => Simulate.click(input))

        const option = container.querySelector('.option-task')

        act(() => Simulate.click(option))

        expect(onChange).toHaveBeenCalledWith('type', 'task')
    })
})
