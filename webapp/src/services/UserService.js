import axios from 'axios'

import Configuration from '../config'

class UserService {
    static async list() {
        let response
        try {
            response = await axios.get(`${Configuration.API_URL}/users`)
        } catch (error) {
            console.error(error)
            response = { data: [] }
        }
        return response.data
    }
}

export default UserService
