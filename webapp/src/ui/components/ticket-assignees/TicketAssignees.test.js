import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'

import { _assignees, _users } from '../../../fixtures/user'
import UserService from '../../../services/UserService'
import TicketAssignees from './TicketAssignees'

jest.mock('../../../services/UserService', () => ({
    list: jest.fn(),
    save: jest.fn()
}))

describe('TicketAssignees', () => {
    let resolve
    beforeEach(() => {
        UserService.list.mockReturnValue(
            new Promise(_resolve => {
                resolve = _resolve
            })
        )
    })

    it('Should show the select', async () => {
        const { container } = render(<TicketAssignees assignees={_assignees} onChange={jest.fn()} />)

        await act(async () => {
            resolve(_users)
        })

        const select = container.querySelector('.ticket-assignees-editor')

        expect(select).not.toBeNull()
        expect(select.querySelectorAll('.avatar-fallback')).toHaveLength(1)
    })

    it('Should call onChange callback when changing value', async () => {
        global.requestAnimationFrame = a => a()
        const onChange = jest.fn()
        const { container } = render(<TicketAssignees assignees={_assignees} onChange={onChange} />)

        await act(async () => {
            resolve(_users)
        })

        const select = container.querySelector('.ticket-assignees-input')

        fireEvent.click(select)

        const option = container.querySelector('.option-2')

        fireEvent.click(option)

        expect(onChange).toHaveBeenCalledWith('assignees', [{ id: 1, name: 'John' }, { id: 2, name: 'Lucy' }])
    })
})
