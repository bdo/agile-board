import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import TicketDescriptionEditor from './TicketDescriptionEditor'

describe('TicketDescriptionEditor', () => {
    it('Should show the textarea', async () => {
        const { container } = render(<TicketDescriptionEditor description="Hello world" onChange={jest.fn()} />)
        const textarea = container.querySelector('.ticket-description-editor')
        expect(textarea).not.toBeNull()
        expect(textarea.value).toBe('Hello world')
    })

    it('Should call onChange callback when changing value', async () => {
        const onChange = jest.fn()
        const { container } = render(<TicketDescriptionEditor description="Hello world" onChange={onChange} />)
        const textarea = container.querySelector('.ticket-description-editor')
        fireEvent.change(textarea, { target: { value: 'Hello people' } })
        expect(onChange).toHaveBeenCalledWith('description', 'Hello people')
    })
})
