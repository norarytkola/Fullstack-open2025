import { useState } from 'react'
import countryService from './services/countries.js'
import './App.css'
import Countries from './components/Countries.jsx'
import { useEffect } from 'react'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')


  const handleChange = (event) => {
      setFilter(event.target.value)
  }

  useEffect(() => {
      countryService
        .getAll()
        .then(response => {
          setCountries(response.data)
        })
    }, [])

  return (
    <>
      <div>
        <h3>Find countries:</h3>
        <input value={filter} onChange={handleChange} />
        </div>
        <div>
          <Countries filter = {filter} countries = {countries}/>
        </div>
        
    </>
  )
}

export default App
