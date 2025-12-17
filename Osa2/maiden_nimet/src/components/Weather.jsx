import axios from 'axios'
import { useState, useEffect } from 'react'

const Weather = ({ country }) => {
  const lat = country?.latlng?.[0]
  const lon = country?.latlng?.[1]

  const [saa, lisaaSaa] = useState(null)

  useEffect(() => {
    if (!lat || !lon) return

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=de8039dae53f6a4ec4530ab4e582180f`
      )
      .then((response) => {
        lisaaSaa(response.data)
      })
      .catch((err) => console.error(err))
  }, [lat, lon])

  if (!saa) return <div>Loading weather...</div>

  return (
    <div>
      <h3>Weather in {country.name.common}</h3>
      Temperature: {saa.main.temp} °C<br />
      Weather: {saa.weather[0].description}<br />
      Wind: {saa.wind.speed} m/s
    </div>
  )
}

export default Weather