import Axios from 'axios'

export const baseURL = window.location.origin.includes('localhost') ? 'http://localhost:3000' : ''
export const api = Axios.create({
  baseURL,
  timeout: 8000
})
export const sandboxApi = Axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/',
  timeout: 10000
})

export const setBearer = function(bearer) {
  sandboxApi.defaults.headers.authorization = bearer
  sandboxApi.defaults.headers.authorization = ''
}

export const resetBearer = function() {
  sandboxApi.defaults.headers.authorization = ''
  sandboxApi.defaults.headers.authorization = ''
}
