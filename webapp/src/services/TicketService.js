import axios from 'axios'

import Configuration from '../config'

class TicketService {
    static async list(params) {
        let response
        try {
            response = await axios.get(`${Configuration.API_URL}/tickets`, { params })
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

    static async save({ id, ...ticket }) {
        try {
            if (id) await axios.put(`${Configuration.API_URL}/tickets/${id}`, ticket)
            else await axios.post(`${Configuration.API_URL}/tickets`, ticket)
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
