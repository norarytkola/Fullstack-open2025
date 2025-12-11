import { useState } from "react"

const Form = ({persons, setPersons}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

   const addPerson = (event) => {
    event.preventDefault()
    // tarkistetaan, ettei nimeä lydy jo listasta
    if (persons.some((p) => p.name === newName)){
      alert(`${newName} is already added to phonebook`)
      console.log("varattu")
    } else {
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
      // kenttien tyhjennys, kun nimi ja numero tallennettu
      setNewName('')
      setNewNumber('')
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