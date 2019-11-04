import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { _sprint } from '../../../fixtures/sprint'
import SprintForm from './SprintForm'

describe('SprintForm', () => {
    let props

    beforeEach(() => {
        props = {
            sprint: _sprint,
            onSave: jest.fn(),
            onClose: jest.fn()
        }
    })

    it('Should show the form', function() {
        const { container } = render(<SprintForm {...props} />)
        const form = container.querySelector('.sprint-form')
        expect(form).not.toBeNull()
    })

    it('Should correctly init the form', function() {
        const { container } = render(<SprintForm {...props} />)
        const input = container.querySelector('.sprint-form input')
        expect(input.value).toBe(_sprint.name)
    })

    it('Should show the delete button for existing sprint', () => {
        const { container } = render(<SprintForm {...props} />)
        const button = container.querySelector('button:nth-child(2)')
        expect(button).not.toBeNull()
    })

    it('Should not show the delete button for new sprint', () => {
        const { container } = render(<SprintForm {...props} sprint={{}} />)
        const button = container.querySelector('button:nth-child(2)')
        expect(button).toBeNull()
    })

    it('Should call onSave when submitting form', () => {
        const { container } = render(<SprintForm {...props} />)
        const form = container.querySelector('.sprint-form')
        fireEvent.submit(form)
        expect(props.onSave).toHaveBeenCalled()
    })

    it('Should call onSave when clicking on archive button', () => {
        const { container } = render(<SprintForm {...props} />)
        const button = container.querySelector('button:nth-child(2)')
        fireEvent.click(button)
        expect(props.onSave).toHaveBeenCalled()
    })

    it('Should call onClose when closing the form', () => {
        const { container } = render(<SprintForm {...props} />)
        const backdrop = container.querySelector('.sprint-form-backdrop')
        fireEvent.mouseDown(backdrop)
        expect(props.onClose).toHaveBeenCalled()
    })
})
