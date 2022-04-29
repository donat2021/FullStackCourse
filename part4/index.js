const app = require('./controllers/blogs')
const http = require('http')
const config = require('./utils/config')

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})