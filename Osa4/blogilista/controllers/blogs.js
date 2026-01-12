const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { tokenExtractor, userExtractor } = require('../utils/extractor')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(Blog => {
      if (Blog) {
        response.json(Blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', tokenExtractor,userExtractor,async (request, response) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(request.user.id)

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
)

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const blogToDelete = await Blog.findById(request.params.id)

    if (!blogToDelete) {
      return response.status(404).json({ error: 'blog not found' })
    }

    if (blogToDelete.user.toString() !== request.user.id.toString()) {
      return response.status(401).json({ error: 'you cant delete this blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
)

blogsRouter.put('/:id', (request, response, next) => {
  const { likes } = request.body

  Blog.findById(request.params.id)
    .then(Blog => {
      if (!Blog) {
        return response.status(404).end()
      }
      Blog.likes = likes

      return Blog.save().then((updatedBlog) => {
        response.json(updatedBlog)
      })
    })
    .catch(error => next(error))
})

module.exports = blogsRouter