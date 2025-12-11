import { useState } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number : '040-1234567'
     }
  ]) 

  const [nameFilter, setNameFilter] = useState('')


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter = {nameFilter} setNameFilter = {setNameFilter}/>
      <Form persons = {persons} setPersons = {setPersons}/>
      <h2>Numbers</h2>
      <Numbers persons = {persons} nameFilter = {nameFilter}/>
    </div>
  )

}

export default App