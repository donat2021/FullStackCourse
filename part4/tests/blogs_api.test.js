const supertest = require('supertest')
const mongoose = require('mongoose')
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
  test('when title or url is missing', async () => {
    const newBlog = {
        author: "someone",
        likes: 7,
    }
    await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Bad Request')
})
describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})
describe('Testing update request:', () => {
  test('Updating likes in a post', async () => {
    const currentBlogsList = await helper.blogsInDb()
    const blogToUpdate = currentBlogsList[0]
    blogToUpdate.likes = 666

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      const blogsAfterUpdate = await helper.blogsInDb()
    const contents = blogsAfterUpdate.map(r => r.likes)

    expect(contents).toContain(666)
  }, 100000)
})

afterAll(() => {
  mongoose.connection.close()
})