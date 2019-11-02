import axios from 'axios'

import SprintService from './SprintService'

jest.mock('axios')

describe('SprintService', () => {
    let errorStub

    beforeEach(() => {
        errorStub = jest.spyOn(global.console, 'error').mockImplementation()
    })

    describe('list', () => {
        it('should return projects', async () => {
            axios.get.mockResolvedValue({ data: [{ id: 1 }, { id: 2 }] })
            const result = await SprintService.list()
            expect(axios.get).toHaveBeenCalled()
            expect(result).toEqual([{ id: 1 }, { id: 2 }])
        })

        it('should log and return empty array on error', async () => {
            axios.get.mockRejectedValue('Error')
            const result = await SprintService.list()
            expect(axios.get).toHaveBeenCalled()
            expect(result).toEqual([])
            expect(errorStub).toHaveBeenCalledWith('Error')
        })
    })

    afterEach(() => {
        errorStub.mockRestore()
    })
})
