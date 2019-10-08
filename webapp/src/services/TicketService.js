import Configuration from '../config'
import axios from 'axios'

class TicketService {
    static async list() {
        let response
        try {
            response = await axios.get(`${Configuration.API_URL}/tickets`)
        } catch (error) {
            console.error(error)
            response = { data: [] }
        }
        return response.data
    }

    static async get(id) {
        let response
        try {
            response = await axios.get(`${Configuration.API_URL}/tickets/${id}`)
        } catch (error) {
            console.error(error)
            response = { data: null }
        }
        return response.data
    }

    static async save({ id, ...body }) {
        try {
            if (id) await axios.put(`${Configuration.API_URL}/tickets/${id}`, { body })
            else await axios.post(`${Configuration.API_URL}/tickets`, { body })
        } catch (error) {
            console.error(error)
        }
    }

    static async delete(id) {
        try {
            await axios.delete(`${Configuration.API_URL}/tickets/${id}`)
        } catch (error) {
            console.error(error)
        }
    }
}

export default TicketService
