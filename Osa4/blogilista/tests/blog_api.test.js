const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = [ {
    title: "testiblogi",
    author: "minä",
    url: "www.iltalehti.fi",
    likes: 50,
    id: "6959654906e082808f85c383"
    },
    {
    title: "test-blog",
    author: "Some One",
    url: "www.facebook.com",
    likes: 100,
    id: "695b68454e3216818ecf1c7b"
    }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

// BLOGIEN TESTAAMINEN

// kaikkien blogien palautus jsonina
test.only('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.length, initialBlogs.length)
})

// varmistetaan yksittäisen blogin löytyminen
test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(e => e.title)
  assert.strictEqual(titles.includes('testiblogi'), true)
})

// testataan että identifioiva kenttä on id
test('blogs are identified with id, not _id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    assert.ok(blog.id)              // id on olemassa
    assert.strictEqual(blog._id, undefined) // _id ei ole olemassa
  })
})

// blogin lisäämisen testaus
test('adding a new blog', async () => {
  const newBlog = {
    title: "testCase",
    author: "Melinda Melanoma",
    url: "www.something.com",
    likes: 100,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  assert.strictEqual(
    response.body.length,
    initialBlogs.length + 1
    )
})

// likes-kentän testaus: jos arvoa ei anneta, arvo = 0
test('new blog without likes has 0 likes', async () => {
  const newBlog = {
    title: "testCase2",
    author: "Arthur Adelmina",
    url: "www.webpage.com",
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
 assert.strictEqual(response.body.likes, 0)
})

// testataan ettei blogin lisäämien onnistu ilman title-kenttää
test('adding a new blog without a title fails', async () => {
  const newBlog = {
    author: "Cecilia Celsius",
    url: "www.something.com",
    likes: 100,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

// testataan ettei blogin lisäämien onnistu ilman author-kenttää
test('adding a new blog without an author fails', async () => {
  const newBlog = {
    title: "BlogThatWeDontWant",
    url: "www.something.com",
    likes: 100,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

// testataan yksittäisen blogin poisto
test('deleting a blog', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToDelete = blogsAtStart.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')
  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1 )
})

// testataan yksittäisen blogin muokkaaminen
test('updating a blog', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToUpdate = blogsAtStart.body[0]
  const newLikes = 3

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: newLikes })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, newLikes)
})

// KÄYTTÄJÄN TESTAAMINEN

// käyttäjän lisäämisen testaus
test('adding a new user', async () => {
  const newUser = {
    username: "testUser",
    name: "Helmer Hitchhock",
    password: "8charactersatleast"
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, 1)
})


after(async () => {
  await mongoose.connection.close()
})