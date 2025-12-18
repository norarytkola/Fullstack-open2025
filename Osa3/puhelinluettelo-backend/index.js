const express = require('express')
const app = express()

const persons =[
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

app.get('/', (req, resporesnse) => {
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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)