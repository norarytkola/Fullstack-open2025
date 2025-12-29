import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const get = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}

const update = (id, newNumber) => {
  return axios.put(`${baseUrl}/${id}`, newNumber)
}

export default { 
  getAll: getAll, 
  create: create, 
  remove: remove ,
  get: get,
  update: update
}