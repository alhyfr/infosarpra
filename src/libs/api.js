import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3002/client',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if(config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }
  return config
})

export default api