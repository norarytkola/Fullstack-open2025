const express = require('express')
const Blog = require('./models/blog')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')

const app = express()


//const Blog = mongoose.model('Blog', blogSchema)


app.use(express.json())

app.use('/api/blogs', blogsRouter)



app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})