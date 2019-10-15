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

    static async get(id) {
        let response
        try {
            response = await axios.get(`${Configuration.API_URL}/projects/${id}`)
        } catch (error) {
            console.error(error)
            response = { data: null }
        }
        return response.data
    }
}

export default ProjectService
