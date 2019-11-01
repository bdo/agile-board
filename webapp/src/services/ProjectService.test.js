import axios from 'axios'

import ProjectService from './ProjectService'

jest.mock('axios')

describe('ProjectService', () => {
    let errorStub

    beforeEach(() => {
        errorStub = jest.spyOn(global.console, 'error').mockImplementation()
    })

    describe('list', () => {
        it('should return projects', async () => {
            axios.get.mockResolvedValue({ data: [{ id: 1 }, { id: 2 }] })
            const result = await ProjectService.list()
            expect(axios.get).toHaveBeenCalled()
            expect(result).toEqual([{ id: 1 }, { id: 2 }])
        })

        it('should log and return empty array on error', async () => {
            axios.get.mockRejectedValue('Error')
            const result = await ProjectService.list()
            expect(axios.get).toHaveBeenCalled()
            expect(result).toEqual([])
            expect(errorStub).toHaveBeenCalledWith('Error')
        })
    })

    describe('get', () => {
        it('should return projects', async () => {
            axios.get.mockResolvedValue({ data: { id: 1 } })
            const result = await ProjectService.get()
            expect(axios.get).toHaveBeenCalled()
            expect(result).toEqual({ id: 1 })
        })

        it('should log and return empty null on error', async () => {
            axios.get.mockRejectedValue('Error')
            const result = await ProjectService.get()
            expect(axios.get).toHaveBeenCalled()
            expect(result).toEqual(null)
            expect(errorStub).toHaveBeenCalledWith('Error')
        })
    })

    describe('save', () => {
        it('should use put method if id is present', async () => {
            axios.put.mockResolvedValue({})
            await ProjectService.save({ id: 1 })
            expect(axios.put).toHaveBeenCalled()
        })

        it('should use post method if id is not present', async () => {
            axios.post.mockResolvedValue({})
            await ProjectService.save({})
            expect(axios.post).toHaveBeenCalled()
        })

        it('should log on error', async () => {
            axios.post.mockRejectedValue('Error')
            await ProjectService.save({})
            expect(errorStub).toHaveBeenCalledWith('Error')
        })
    })

    afterEach(() => {
        errorStub.mockRestore()
    })
})
