import React from 'react'

import { _assignees } from '../../../fixtures/user'
import { renderInRouter } from '../../../test-render'
import TicketAssignees from './TicketAssignees'

jest.mock('../avatar/Avatar', () => ({
    __esModule: true,
    default: function TicketEditorMock() {
        return <div className="avatar-mock" />
    }
}))

describe('TicketTile', () => {
    it('Should show the assignees', function() {
        const { container } = renderInRouter(<TicketAssignees assignees={_assignees} />)
        const assignees = container.querySelector('.assignees')
        const avatars = container.querySelectorAll('.avatar-mock')
        expect(assignees).not.toBeNull()
        expect(avatars).toHaveLength(1)
    })
})
