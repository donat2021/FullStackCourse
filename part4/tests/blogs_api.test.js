const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
//const app = require('../controllers/blogs')
const helper=  require('../tests/test_helper')
const Blog = require('../model/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('same blogs amount', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogsToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogsToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const processedBlogToView = JSON.parse(JSON.stringify(blogsToView))
  
    expect(resultBlog.body).toEqual(processedBlogToView)
  })
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: "dsfsd",
      author: "fsdgfd",
      url: "ioreote",
      likes: 14
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const title = blogsAtEnd.map(n => n.title)
    expect(title).toContain(
      'dsfsd'
    )
  })
  test('a like property zero', async () => {
    const newBlog = {
      title: "dsfsd",
      author: "fsdgfd",
      url: "ioreote"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const likes = blogsAtEnd.map(n => n.likes)
    expect(likes).toContain(
     0
    )
  })


afterAll(() => {
  mongoose.connection.close()
})