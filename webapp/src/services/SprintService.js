import axios from 'axios'

import Configuration from '../config'

class SprintService {
    static async list(params) {
        let response
        try {
            response = await axios.get(`${Configuration.API_URL}/sprints`, { params })
        } catch (error) {
            console.error(error)
            response = { data: [] }
        }
        return response.data
    }
}

export default SprintService
