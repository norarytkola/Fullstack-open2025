import { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import Form from './components/Form'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [nameFilter, setNameFilter] = useState('')

  const namesToShow = nameFilter == ''
      ? persons
      : persons.filter(p => p.name.includes(nameFilter))

  // Datan hakeminen palvelimelta persons-listaukseen
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  // Henkilön poistaminen nappia painamalla
  const removePerson = (id, name) => {
  if (window.confirm(`Delete ${name}?`)) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        console.error(error)
        alert('Person was already removed from server')
      })
    }
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter = {nameFilter} setNameFilter = {setNameFilter}/>
      <Form persons = {persons} setPersons = {setPersons}/>
      <h2>Numbers</h2>
      {namesToShow.map(p =>
        <Numbers
          key={p.id}
          p={p}
          removePerson={() => removePerson(p.id, p.name)}
        />
)}
    </div>
  )

}

export default App