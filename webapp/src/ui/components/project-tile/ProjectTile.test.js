import React from 'react'

import { _project } from '../../../fixtures/project'
import ProjectTile from './ProjectTile'

describe('ProjectTile', () => {
    it('Should show the tile', function() {
        const { container } = renderInRouter(<ProjectTile project={_project} />)
        const tile = container.querySelector('.project-tile')
        expect(tile).not.toBeNull()
        const h5 = tile.querySelector('h5')
        expect(h5).not.toBeNull()
        expect(h5.textContent).toBe(_project.name)
        const p = tile.querySelector('p')
        expect(p).not.toBeNull()
        expect(p.textContent).toBe(_project.description)
    })

    it('Should show the tile when project is archived', function() {
        const { container } = renderInRouter(<ProjectTile project={{ ..._project, archived: true }} />)
        const tile = container.querySelector('.project-tile.archived')
        expect(tile).not.toBeNull()
    })
})
