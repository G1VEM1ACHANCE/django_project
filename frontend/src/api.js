import axios from 'axios'
import { ACCESS_TOKEN } from './constant'

const api = axios.create({baseURL:"http://127.0.0.1:8000"})

api.interceptors.request.use(
    (config) => {
        console.log(config)
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
        },
        (err) => {
            return Promise.reject(err)
        }
        
    );
export default api