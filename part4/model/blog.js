require('dotenv').config()
const mongoose = require('mongoose')

const mongoUrl =process.env.MONGO_DB_BLOGS
mongoose.connect(mongoUrl)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

module.exports = mongoose.model('Blog', blogSchema)