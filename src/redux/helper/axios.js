import axios from 'axios'

const token = localStorage.getItem('token');
const instance = axios.create({
    baseURL:'https://tick-m-events-server.onrender.com/api/v1',
    withCredentials: true, // This enables cookie handling
    headers: {
        'Authorization': token ? `Bearer ${token}` : '',
    }
})
export default instance