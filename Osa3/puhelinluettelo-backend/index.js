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
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = Person.find({})
    
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

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then(p => {
      if (p) {
        res.json(p)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (req, res) => {
    const {name, number} = req.body
    if (!name || !number) {
      return res.status(400).json({
        error: 'name or number missing'
      })}
    /* MongoDB muodostaa id:n, joten jätetään tämä vaihe nyt pois
    const id = persons.length > 0
      ? Math.max(...persons.map(p => Number(p.id))) + 1
      : 1
      */
    const person = new Person({ name: name,
            number: number
    })
    person.save().then(savedP => {
      res.json(savedP)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const { number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

// Virheiden käsittely:

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)