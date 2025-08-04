import axios from 'axios'

// for live
const instance = axios.create({
    baseURL: import.meta.env.VITE_LOCAL_LIVE_URL || 'https://tick-m-events-server.onrender.com/api/v1',
    // baseURL: 'http://localhost:8000/api/v1',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
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