import { useState } from 'react'
import Weather from './Weather'

const Country = ({ c, length }) => {

  const [showDetails, setShowDetails] = useState(false)
  const languages = Object.entries(c.languages).map(([key, value]) => (
    <li key={key}>{value}</li>
  ))

  const img = c.flags.png

  if (length > 1){
     return (
    <div>
      <p>
        {c.name.common}{' '}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide' : 'Show'}
        </button>
      </p>

      {showDetails &&  (
        <div>
          <h1>{c.name.common}</h1>
          Capital: {c.capital}<br/>
          Population: {c.population}<br/>
          Area: {c.area}<br/>
          <h3>Languages:</h3>
          <ul>{languages}</ul>
          <img src={img} width="150em" alt={`Flag of ${c.name.common}`} />
          <Weather country = {c}/>
        </div>
      )}
    </div>
  )} else if (length == 1){
    return(
        <div>
          <h1>{c.name.common}</h1>
          Capital: {c.capital}<br/>
          Population: {c.population}<br/>
          Area: {c.area}<br/>
          <h3>Languages:</h3>
          <ul>{languages}</ul>
          <img src={img} width="150em" alt={`Flag of ${c.name.common}`} />
          <Weather city = {c.capital}/>
        </div>
    )
  }
 
}

export default Country