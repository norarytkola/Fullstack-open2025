require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
morgan.token('body', (req) => {
  return req.method === 'POST' && req.url.startsWith('/api/persons')
    ? JSON.stringify(req.body)
    : ''
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)


let persons =[
    {
        id: "1",
        name: "Arto Hellas",
        number: "050-1234785"
      
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
      
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
      
    },
    {   id: "4",
        name: "Mary Poppendick",
        number : "39-23-6423122"
    }
  ]
    
app.get('/api/persons', (req, res) => {
    Person.find({}).then(p => {
      res.json(p) })
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    const time = new Date()
    res.send(`<p> Phonebook has info for ${persons.length} people</p> <p> ${time}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(request.params.id).then(p => {
    response.json(p)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const initialLength = persons.length
  persons = persons.filter(p => p.id !== id)
  if (persons.length === initialLength) {
    return res.status(404).json({ error: 'Person not found' })
  }
  res.status(204).end()
})

app.post('/api/persons/', (req, res) => {
    const {name, number} = req.body
    if (!name || !number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  } else if (persons.some(p => p.name === name)) {
    return res.status(400).json({
        error: 'name is already in the Phonebook'
    })
  }
    /* MongoDB muodostaa id:n, joten jätetään tämä vaihe nyt pois
    const id = persons.length > 0
      ? Math.max(...persons.map(p => Number(p.id))) + 1
      : 1
      */
    const person = new Person({ name: name,
            number: number
    })
    person.save().then(savedP => {
      res.json(person)
    })
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)