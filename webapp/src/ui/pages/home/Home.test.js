import { fireEvent } from '@testing-library/dom'
import React from 'react'
import { act } from 'react-dom/test-utils'

import { _project, _project2 } from '../../../fixtures/project'
import ProjectService from '../../../services/ProjectService'
import { renderInRouter } from '../../../test-render'
import Home from './Home'

jest.mock('../../components/project-tile/ProjectTile', () => ({
    __esModule: true,
    default: function ProjectTileMock() {
        return <div className="project-tile-mock" />
    }
}))

jest.mock('../../components/project-form/ProjectForm', () => ({
    __esModule: true,
    default: function ProjectFormMock() {
        return <div className="project-form-mock" />
    }
}))

jest.mock('../../../services/ProjectService')

describe('Home', () => {
    let resolve
    beforeEach(() => {
        ProjectService.list.mockReturnValue(
            new Promise(_resolve => {
                resolve = _resolve
            })
        )
    })

    it('Should not show the project tiles when there are no projects', async () => {
        const { container } = renderInRouter(<Home />)
        await act(async () => {
            resolve([])
        })
        const projectTile = container.querySelectorAll('.project-tile-mock')
        expect(projectTile).toHaveLength(0)
    })

    it('Should show the project tiles', async () => {
        const { container } = renderInRouter(<Home />)
        await act(async () => {
            resolve([_project, _project2])
        })
        const projectTile = container.querySelectorAll('.project-tile-mock')
        expect(projectTile).toHaveLength(2)
    })

    it('Should not show the project form', async () => {
        const { container } = renderInRouter(<Home />)
        await act(async () => {
            resolve([_project])
        })
        const projectForm = container.querySelector('.project-form-mock')
        expect(projectForm).toBeNull()
    })

    it('Should show the project form when clicking on "+" icon', async () => {
        const { container } = renderInRouter(<Home />)
        await act(async () => {
            resolve([_project])
        })
        const addProject = container.querySelector('.icon')
        fireEvent.click(addProject)
        const projectForm = container.querySelector('.project-form-mock')
        expect(projectForm).not.toBeNull()
    })
})
