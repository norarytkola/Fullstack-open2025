import { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import Form from './components/Form'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const namesToShow = nameFilter == ''
      ? persons
      : persons.filter(p => p.name.includes(nameFilter))

  // Datan hakeminen palvelimelta persons-listaukseen
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // Uuden henkilön lisääminen 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleChange = (event) => {
      // Asetetaan input-kentän arvo nimeksi
      //console.log(event.target.value)
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      // Asetetaan input-kentän arvo numeroksi
      setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log("meneekö tänne?")
    // Tarkastetaan löytyyk henkilö jo listalta
    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      // Mahdollisuus päivittää numero
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )) {
        const updatedPerson = {
            ...existingPerson,
            number: newNumber
          }

          personService
            .update(existingPerson.id, updatedPerson)
            .then(response => {
              setPersons(
                persons.map(p =>
                  p.id !== existingPerson.id ? p : response.data
                )
              )
              setMessage(`Person '${newName}' has been updated`)
              setTimeout(() => {etErrorMessage(null)}, 5000)
              setNewName('')
              setNewNumber('')
            })
        }
      // Jos henkilöä ei löydy, luodaan uusi
      } else {
        const person = {
          name: newName,
          number: newNumber
        }

        personService
          .create(person)
          .then(response => {
            setPersons(persons.concat(response.data))
            setMessage(`Person '${newName}' has been added`)
            setTimeout(() => {setErrorMessage(null)}, 5000)
            setNewName('')
            setNewNumber('')
          })
      }
    }
  
  // Henkilön poistaminen nappia painamalla
  const removePerson = (id, name) => {
  if (window.confirm(`Delete ${name}?`)) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setErrorMessage(`Person '${name}' has been removed`)
        setTimeout(() => {setErrorMessage(null)}, 5000)
      })
      .catch(error => {
        console.error(error)
        setErrorMessage(`Person '${name}' has been already removed from the server`)
        setTimeout(() => {etErrorMessage(null)}, 5000)
      })
    }
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {message} errorMessage = {errorMessage}/>
      <Filter nameFilter = {nameFilter} setNameFilter = {setNameFilter}/>
      <Form onSubmit = {addPerson} newName = {newName} newNumber = {newNumber} handleNumberChange = {handleNumberChange} handleChange= {handleChange}/>
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