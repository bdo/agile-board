import axios from 'axios'

import Configuration from '../config'

class ProjectService {
    static async list() {
        let response
        try {
            response = await axios.get(`${Configuration.API_URL}/projects`)
        } catch (error) {
            console.error(error)
            response = { data: [] }
        }
        return response.data
    }

    static async get(id, params) {
        let response
        try {
            response = await axios.get(`${Configuration.API_URL}/projects/${id}`, { params })
        } catch (error) {
            console.error(error)
            response = { data: null }
        }
        return response.data
    }

    static async save({ id, ...project }) {
        try {
            if (id) await axios.put(`${Configuration.API_URL}/projects/${id}`, project)
            else await axios.post(`${Configuration.API_URL}/projects`, project)
        } catch (error) {
            console.error(error)
        }
    }
}

export default ProjectService
