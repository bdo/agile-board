import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { _project } from '../../../fixtures/project'
import ProjectForm from './ProjectForm'

describe('ProjectForm', () => {
    let props

    beforeEach(() => {
        props = {
            project: _project,
            onSave: jest.fn(),
            onClose: jest.fn()
        }
    })

    it('Should show the form', function() {
        const { container } = render(<ProjectForm {...props} />)
        const form = container.querySelector('.project-form')
        expect(form).not.toBeNull()
    })

    it('Should correctly init the form', function() {
        const { container } = render(<ProjectForm {...props} />)
        const input = container.querySelector('.project-form input')
        const textarea = container.querySelector('.project-form textarea')
        expect(input.value).toBe(_project.name)
        expect(textarea.textContent).toBe(_project.description)
    })

    it('Should show the delete button for existing project', () => {
        const { container } = render(<ProjectForm {...props} />)
        const button = container.querySelector('button:nth-child(2)')
        expect(button).not.toBeNull()
    })

    it('Should not show the delete button for new project', () => {
        const { container } = render(<ProjectForm {...props} project={{}} />)
        const button = container.querySelector('button:nth-child(2)')
        expect(button).toBeNull()
    })

    it('Should call onSave when submitting form', () => {
        const { container } = render(<ProjectForm {...props} />)
        const form = container.querySelector('.project-form')
        fireEvent.submit(form)
        expect(props.onSave).toHaveBeenCalled()
    })

    it('Should call onSave when clicking on archive button', () => {
        const { container } = render(<ProjectForm {...props} />)
        const button = container.querySelector('button:nth-child(2)')
        fireEvent.click(button)
        expect(props.onSave).toHaveBeenCalled()
    })

    it('Should call onClose when closing the form', () => {
        const { container } = render(<ProjectForm {...props} />)
        const backdrop = container.querySelector('.project-form-backdrop')
        fireEvent.mouseDown(backdrop)
        expect(props.onClose).toHaveBeenCalled()
    })
})
