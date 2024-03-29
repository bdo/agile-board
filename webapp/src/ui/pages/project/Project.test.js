import { fireEvent } from '@testing-library/dom'
import React from 'react'
import { act } from 'react-dom/test-utils'

import { _archivedProject, _project } from '../../../fixtures/project'
import { _sprint } from '../../../fixtures/sprint'
import ProjectService from '../../../services/ProjectService'
import SprintService from '../../../services/SprintService'
import { renderInRouter } from '../../../test-render'
import Project from './Project'

jest.mock('../../components/project-form/ProjectForm', () => ({
    __esModule: true,
    default: function ProjectFormMock() {
        return <div className="project-form-mock" />
    }
}))

jest.mock('../../components/sprint-panel/SprintPanel', () => ({
    __esModule: true,
    default: function SprintPanelMock() {
        return <div className="sprint-panel-mock" />
    }
}))

jest.mock('../../../services/ProjectService')
jest.mock('../../../services/SprintService')

describe('Project', () => {
    let resolveProject, resolveSprints
    beforeEach(() => {
        ProjectService.get.mockReturnValue(
            new Promise(_resolve => {
                resolveProject = _resolve
            })
        )
        SprintService.list.mockReturnValue(
            new Promise(_resolve => {
                resolveSprints = _resolve
            })
        )
    })

    it('Should show the project name and description', async () => {
        const { container } = renderInRouter(<Project />)
        await act(async () => {
            resolveSprints([_sprint])
            resolveProject(_project)
        })
        const projectName = container.querySelector('h1')
        const projectDescription = container.querySelector('p')
        const sprintsPanel = container.querySelectorAll('.sprint-panel-mock')
        expect(projectName.firstChild.textContent).toBe(_project.name)
        expect(projectDescription.textContent).toBe(_project.description)
        expect(sprintsPanel).toHaveLength(1)
    })

    it('Should show the "edit" icon when project is not archived', async () => {
        const { container } = renderInRouter(<Project />)
        await act(async () => {
            resolveSprints([_sprint])
            resolveProject(_project)
        })
        const editIcon = container.querySelector('.icon')
        expect(editIcon).not.toBeNull()
    })

    it('Should not show the "edit" icon when project is archived', async () => {
        const { container } = renderInRouter(<Project />)
        await act(async () => {
            resolveSprints([_sprint])
            resolveProject(_archivedProject)
        })
        const editIcon = container.querySelector('.icon')
        expect(editIcon).toBeNull()
    })

    it('Should not show the project form', async () => {
        const { container } = renderInRouter(<Project />)
        await act(async () => {
            resolveSprints([_sprint])
            resolveProject(_archivedProject)
        })
        const projectForm = container.querySelector('.project-form-mock')
        expect(projectForm).toBeNull()
    })

    it('Should open the project form when clicking on "edit" icon', async () => {
        const { container } = renderInRouter(<Project />)
        await act(async () => {
            resolveSprints([_sprint])
            resolveProject(_project)
        })
        const editIcon = container.querySelector('.icon')
        fireEvent.click(editIcon)
        const projectForm = container.querySelector('.project-form-mock')
        expect(projectForm).not.toBeNull()
    })
})
