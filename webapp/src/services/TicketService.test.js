import axios from 'axios'

import TicketService from './TicketService'

jest.mock('axios')

describe('TicketService', () => {
    let errorStub

    beforeEach(() => {
        errorStub = jest.spyOn(global.console, 'error').mockImplementation()
    })

    describe('list', () => {
        it('should return projects', async () => {
            axios.get.mockResolvedValue({ data: [{ id: 1 }, { id: 2 }] })
            const result = await TicketService.list()
            expect(axios.get).toHaveBeenCalled()
            expect(result).toEqual([{ id: 1 }, { id: 2 }])
        })

        it('should log and return empty array on error', async () => {
            axios.get.mockRejectedValue('Error')
            const result = await TicketService.list()
            expect(axios.get).toHaveBeenCalled()
            expect(result).toEqual([])
            expect(errorStub).toHaveBeenCalledWith('Error')
        })
    })

    describe('get', () => {
        it('should return projects', async () => {
            axios.get.mockResolvedValue({ data: { id: 1 } })
            const result = await TicketService.get()
            expect(axios.get).toHaveBeenCalled()
            expect(result).toEqual({ id: 1 })
        })

        it('should log and return empty null on error', async () => {
            axios.get.mockRejectedValue('Error')
            const result = await TicketService.get()
            expect(axios.get).toHaveBeenCalled()
            expect(result).toEqual(null)
            expect(errorStub).toHaveBeenCalledWith('Error')
        })
    })

    describe('save', () => {
        it('should use put method if id is present', async () => {
            axios.put.mockResolvedValue({})
            await TicketService.save({ id: 1 })
            expect(axios.put).toHaveBeenCalled()
        })

        it('should use post method if id is not present', async () => {
            axios.post.mockResolvedValue({})
            await TicketService.save({})
            expect(axios.post).toHaveBeenCalled()
        })

        it('should log on error', async () => {
            axios.post.mockRejectedValue('Error')
            await TicketService.save({})
            expect(errorStub).toHaveBeenCalledWith('Error')
        })
    })

    describe('delete', () => {
        it('should call delete method', async () => {
            axios.delete.mockResolvedValue({})
            await TicketService.delete(1)
            expect(axios.delete).toHaveBeenCalled()
        })

        it('should log and return empty null on error', async () => {
            axios.delete.mockRejectedValue('Error')
            await TicketService.delete(1)
            expect(axios.delete).toHaveBeenCalled()
            expect(errorStub).toHaveBeenCalledWith('Error')
        })
    })

    afterEach(() => {
        errorStub.mockRestore()
    })
})
