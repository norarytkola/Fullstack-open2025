const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(cors())
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
    res.json(persons)
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    const time = new Date()
    res.send(`<p> Phonebook has info for ${persons.length} people</p> <p> ${time}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)
    if (!person){
        res.send(`Couldn't find the person. Check the id and try again.`)
    }
    res.json(person)
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
    const id = persons.length > 0
      ? Math.max(...persons.map(p => Number(p.id))) + 1
      : 1
    const person = { name: name,
            number: number,
            id: String(id)
    }
  
    persons = persons.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)