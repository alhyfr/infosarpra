import axios from 'axios'

const baseURL = 'http://localhost:3002/client'
// const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://api7.sistelk.id/client'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }
  return config
})

export default api