import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
  return axios.get(baseUrl)
}


const get = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}



export default { 
  getAll: getAll, 
  get: get,

}