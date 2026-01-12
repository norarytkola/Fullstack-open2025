const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

let token

beforeEach(async () => {
  await helper.createTestUser()

  // login ja token
  const loginResponse = await api
    .post('/api/login')
    .send({
      username: helper.initialUser.username,
      password: helper.initialUser.password
    })

  token = loginResponse.body.token
})

describe('Blog API tests', () => {

  test('GET /api/blogs returns JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('POST /api/blogs works with valid token', async () => {
    const newBlog = {
      title: 'Token test blog',
      author: 'Tester',
      url: 'http://example.com',
      likes: 5
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.title).toBe(newBlog.title)
  })

  test('DELETE /api/blogs/:id works only for owner', async () => {
    // Luo blogi ensin
    const blogToDelete = {
      title: 'Delete me',
      author: 'Tester',
      url: 'http://example.com'
    }

    const postResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogToDelete)

    const blogId = postResponse.body.id

    // Poisto omistajalla
    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    // varmistetaan ettei enää ole tietokannassa
    const allBlogs = await api.get('/api/blogs')
    expect(allBlogs.body).not.toContainEqual(
      expect.objectContaining({ id: blogId })
    )
  })

  test('DELETE /api/blogs/:id fails for wrong user', async () => {
    // Luo blogi ensin
    const blogToDelete = {
      title: 'Cannot delete',
      author: 'Tester',
      url: 'http://example.com'
    }

    const postResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogToDelete)

    const blogId = postResponse.body.id

    // Luo toinen käyttäjä
    const secondUser = {
      username: 'otheruser',
      name: 'Other User',
      password: 'sekret2'
    }

    await api.post('/api/users').send(secondUser)

    const loginSecond = await api
      .post('/api/login')
      .send({ username: secondUser.username, password: secondUser.password })

    const secondToken = loginSecond.body.token

    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${secondToken}`)
      .expect(401)
  })

  test('Cannot POST blog without token', async () => {
    const newBlog = {
      title: 'No token blog',
      author: 'Tester',
      url: 'http://example.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

afterAll(async () => {
  await Blog.deleteMany({})
})
