import { useState } from "react"
import personService from '../services/persons.js'

const Form = ({persons, setPersons}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleChange = (event) => {
      // Asetetaan input-kentän arvo nimeksi
      setNewName(event.target.value)
  }

    const handleNumberChange = (event) => {
      // Asetetaan input-kentän arvo numeroksi
      setNewNumber(event.target.value)
    }

    const addPerson = (event) => {
      event.preventDefault()
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
            setNewName('')
            setNewNumber('')
          })
      }
    }

    return (
        <form onSubmit = {addPerson}>
        <h3>Add a new</h3>
        <div>
          name: <input value = {newName} onChange = {handleChange}/>
        </div>
        <div>
          number: <input value = {newNumber} onChange = {handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Form