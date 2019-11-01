import { fireEvent } from '@testing-library/dom'
import React from 'react'
import { act } from 'react-dom/test-utils'

import { _archivedProject, _project } from '../../../fixtures/project'
import ProjectService from '../../../services/ProjectService'
import { renderInRouter } from '../../../test-render'
import Project from './Project'

jest.mock('../../components/project-form/ProjectForm', () => ({
    __esModule: true,
    default: () => <div className="project-form-mock" />
}))

jest.mock('../../../services/ProjectService')

describe('Project', () => {
    let resolve
    beforeEach(() => {
        ProjectService.get.mockReturnValue(
            new Promise(_resolve => {
                resolve = _resolve
            })
        )
    })

    it('Should show the project name and description', async () => {
        const { container } = renderInRouter(<Project />)
        await act(async () => {
            resolve(_project)
        })
        const projectName = container.querySelector('h1')
        const projectDescription = container.querySelector('p')
        expect(projectName.firstChild.textContent).toBe(_project.name)
        expect(projectDescription.textContent).toBe(_project.description)
    })

    it('Should show the "edit" icon when project is not archived', async () => {
        const { container } = renderInRouter(<Project />)
        await act(async () => {
            resolve(_project)
        })
        const editIcon = container.querySelector('.icon')
        expect(editIcon).not.toBeNull()
    })

    it('Should not show the "edit" icon when project is archived', async () => {
        const { container } = renderInRouter(<Project />)
        await act(async () => {
            resolve(_archivedProject)
        })
        const editIcon = container.querySelector('.icon')
        expect(editIcon).toBeNull()
    })

    it('Should not show the project form', async () => {
        const { container } = renderInRouter(<Project />)
        await act(async () => {
            resolve(_archivedProject)
        })
        const projectForm = container.querySelector('.project-form-mock')
        expect(projectForm).toBeNull()
    })

    it('Should open the project form when clicking on "edit" icon', async () => {
        const { container } = renderInRouter(<Project />)
        await act(async () => {
            resolve(_project)
        })
        const editIcon = container.querySelector('.icon')
        fireEvent.click(editIcon)
        const projectForm = container.querySelector('.project-form-mock')
        expect(projectForm).not.toBeNull()
    })
})
