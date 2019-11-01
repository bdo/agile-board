import { fireEvent } from '@testing-library/dom'
import React from 'react'
import { act } from 'react-dom/test-utils'

import { _project, _project2 } from '../../../fixtures/project'
import ProjectService from '../../../services/ProjectService'
import { renderInRouter } from '../../../test-render'
import Board from './Board'

jest.mock('../../../services/ProjectService')

jest.mock('../../components/tickets-table/TicketsTable', () => ({
    __esModule: true,
    default: function TicketsTableMock() {
        return <div className="tickets-table-mock" />
    }
}))

describe('Board', () => {
    let resolve
    beforeEach(() => {
        ProjectService.list.mockReturnValue(
            new Promise(_resolve => {
                resolve = _resolve
            })
        )
    })

    it('Should show the no project found information', async () => {
        const { container } = renderInRouter(<Board />)
        await act(async () => {
            resolve([])
        })
        const noProjectFound = container.querySelector('.board-no-project-found')
        const navbar = container.querySelector('.board-navbar')
        const table = container.querySelector('.tickets-table-mock')
        expect(noProjectFound).not.toBeNull()
        expect(navbar).toBeNull()
        expect(table).toBeNull()
    })

    it('Should show the navbar and table', async () => {
        const { container } = renderInRouter(<Board />)
        await act(async () => {
            resolve([_project])
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
            resolve([_project])
        })
        const navbarProjectName = container.querySelector('.board-navbar .project-name span:first-child')
        expect(navbarProjectName).not.toBeNull()
        expect(navbarProjectName.textContent).toBe(_project.name)
    })

    it('Should change the active project when changing navbar selection', async () => {
        const { container } = renderInRouter(<Board />)
        await act(async () => {
            resolve([_project, _project2])
        })
        const navbarProjectName = container.querySelector('.board-navbar .project-name span:first-child')
        expect(navbarProjectName.textContent).toBe(_project.name)
        fireEvent.click(navbarProjectName)
        const option = container.querySelector('.board-navbar .option-2')
        fireEvent.click(option)
        expect(navbarProjectName.textContent).toBe(_project2.name)
    })
})
