const Form = ({ onSubmit, newName, newNumber, handleChange, handleNumberChange }) => {

  
  return(
      <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={handleChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <button type="submit">add</button>
  </form>

  )
}

export default Form