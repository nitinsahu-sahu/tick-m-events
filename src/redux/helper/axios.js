import axios from 'axios'

// Local host
// const token = localStorage.getItem('token');
// const instance = axios.create({
//     // baseURL: 'https://tick-m-events-server.onrender.com/api/v1',
//     baseURL: 'http://localhost:8000/api/v1',
//     withCredentials: true, // This enables cookie handling
//     headers: {
//         'Authorization': token ? `Bearer ${token}` : '',
//     }
// })
// export default instance

// for live
const instance = axios.create({
    baseURL: 'https://tick-m-events-server.onrender.com/api/v1',
    // baseURL: 'http://localhost:8000/api/v1',
    withCredentials: true,
});

// Add request interceptor to handle token dynamically
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;