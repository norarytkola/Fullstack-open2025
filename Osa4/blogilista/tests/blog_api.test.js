const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

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
 //   id: "123456789"
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

after(async () => {
  await mongoose.connection.close()
})