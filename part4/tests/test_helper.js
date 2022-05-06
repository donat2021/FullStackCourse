const Blog = require('../model/blog')

const initialBlogs = [
  {
    title: "something",
    author: "martin",
    url: "sadsada",
    likes: 5
  },
  {
    title: "read the material",
    author: "heikki",
    url: "sdsada",
    likes: 7
  }
]

/*const nonExistingBlog = async () => {
  const blog = new Note({ content: 'willremovethissoon', date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}*/

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}
