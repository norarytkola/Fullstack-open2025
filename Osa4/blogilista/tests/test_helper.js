const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

const initialUser = {
  username: 'testuser',
  name: 'Test User',
  password: 'sekret'
}

const createTestUser = async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const passwordHash = await bcrypt.hash(initialUser.password, 10)
  const user = new User({
    username: initialUser.username,
    name: initialUser.name,
    passwordHash
  })

  await user.save()
}

module.exports = {
  initialUser,
  createTestUser
}