if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const methodOverride = require('method-override')

const app = express()
const port = process.env.PORT || 3000
const http = require('http')
const server = http.createServer(app)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

app.get('', (req, res) => {
  res.send('Hello world!')
})
app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204)
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app
