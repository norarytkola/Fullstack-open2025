const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://norarytkola_db_user:${password}@cluster0.kkwtt2b.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3){
    let person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      
    })
    person.save().then(result => {
    console.log(`added ${person.name} to phonebook `)
    mongoose.connection.close()
})
} else {
    console.log("phonebook")
    Person.find({}).then(result => {
        result.forEach(p => {
        console.log(p.name + p.number)
  })
  mongoose.connection.close()
})
}



