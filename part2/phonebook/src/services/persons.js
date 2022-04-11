import axios from 'axios'
const personsUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(personsUrl)
  return request.then(response => response.data)
}

const create = (nameobject) => {
  const request = axios.post(personsUrl,nameobject)
  return request.then(response => response.data)
}
const remove = (objectid) => {
  const request = axios.delete(personsUrl+`/`+objectid.toString())
  return request.then(response => response)
}
const replace = (newobject) => {
  const request = axios.put(personsUrl+`/`+newobject.id,newobject)
  return request.then(response => response.data)
}

export default{
  getAll: getAll,
  create: create,
  remove: remove,
  replace: replace
}