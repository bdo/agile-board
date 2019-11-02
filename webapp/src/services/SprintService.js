import axios from 'axios'

import Configuration from '../config'

class SprintService {
    static async list() {
        let response
        try {
            response = await axios.get(`${Configuration.API_URL}/sprints`)
        } catch (error) {
            console.error(error)
            response = { data: [] }
        }
        return response.data
    }
}

export default SprintService
