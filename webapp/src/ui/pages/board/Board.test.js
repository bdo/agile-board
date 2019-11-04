import { fireEvent } from '@testing-library/dom'
import React from 'react'
import { act } from 'react-dom/test-utils'

import { _project, _project2 } from '../../../fixtures/project'
import { _sprint, _sprint2 } from '../../../fixtures/sprint'
import ProjectService from '../../../services/ProjectService'
import SprintService from '../../../services/SprintService'
import { renderInRouter } from '../../../test-render'
import Board from './Board'

jest.mock('../../../services/ProjectService')
jest.mock('../../../services/SprintService')

jest.mock('../../components/tickets-table/TicketsTable', () => ({
    __esModule: true,
    default: function TicketsTableMock() {
        return <div className="tickets-table-mock" />
    }
}))

describe('Board', () => {
    let resolveProjects
    beforeEach(() => {
        ProjectService.list.mockReturnValue(
            new Promise(_resolve => {
                resolveProjects = _resolve
            })
        )
        SprintService.list.mockResolvedValue([])
    })

    it('Should show the no project found information', async () => {
        const { container } = renderInRouter(<Board />)
        await act(async () => {
            resolveProjects([])
        })
        const noProjectFound = container.querySelector('.board-no-project-found')
        const navbar = container.querySelector('.board-navbar')
        const table = container.querySelector('.tickets-table-mock')
        expect(noProjectFound).not.toBeNull()
        expect(navbar).toBeNull()
        expect(table).toBeNull()
    })

    it('Should show the no active sprint found information', async () => {
        const { container } = renderInRouter(<Board />)
        await act(async () => {
            resolveProjects([_project])
        })
        const noSprintFound = container.querySelector('.board-no-sprint-found')
        const navbar = container.querySelector('.board-navbar')
        const table = container.querySelector('.tickets-table-mock')
        expect(noSprintFound).not.toBeNull()
        expect(navbar).not.toBeNull()
        expect(table).toBeNull()
    })

    it('Should show the navbar and table', async () => {
        SprintService.list.mockResolvedValue([_sprint])
        const { container } = renderInRouter(<Board />)
        await act(async () => {
            resolveProjects([_project])
        })
        const noProjectFound = container.querySelector('.board-no-project-found')
        const navbar = container.querySelector('.board-navbar')
        const table = container.querySelector('.tickets-table-mock')
        expect(noProjectFound).toBeNull()
        expect(navbar).not.toBeNull()
        expect(table).not.toBeNull()
    })

    it('Should show the active project name in the navbar', async () => {
        const { container } = renderInRouter(<Board />)
        await act(async () => {
            resolveProjects([_project])
        })
        const navbarProjectName = container.querySelector('.board-navbar .project-name span:first-child')
        expect(navbarProjectName).not.toBeNull()
        expect(navbarProjectName.textContent).toBe(_project.name)
    })

    it('Should change the active project when changing navbar selection', async () => {
        const { container } = renderInRouter(<Board />)
        await act(async () => {
            resolveProjects([_project, _project2])
        })
        const navbarProjectName = container.querySelector('.board-navbar .project-name span:first-child')
        expect(navbarProjectName.textContent).toBe(_project.name)
        fireEvent.click(navbarProjectName)
        const option = container.querySelector('.board-navbar .project-select .option-2')
        fireEvent.click(option)
        expect(navbarProjectName.textContent).toBe(_project2.name)
    })

    it('Should show the active sprint name in the navbar', async () => {
        SprintService.list.mockResolvedValue([_sprint])
        const { container } = renderInRouter(<Board />)
        await act(async () => {
            resolveProjects([_project])
        })
        const navbarSprintName = container.querySelector('.board-navbar .sprint-name span:first-child')
        expect(navbarSprintName).not.toBeNull()
        expect(navbarSprintName.textContent).toBe(_sprint.name)
    })

    it('Should change the active sprint when changing navbar selection', async () => {
        SprintService.list.mockResolvedValue([_sprint, _sprint2])
        const { container } = renderInRouter(<Board />)
        await act(async () => {
            resolveProjects([_project, _project2])
        })
        const navbarSprintName = container.querySelector('.board-navbar .sprint-name span:first-child')
        expect(navbarSprintName.textContent).toBe(_sprint.name)
        fireEvent.click(navbarSprintName)
        const option = container.querySelector('.board-navbar .sprint-select .option-2')
        fireEvent.click(option)
        expect(navbarSprintName.textContent).toBe(_sprint2.name)
    })
})
