const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static('../public'))
app.use(bodyParser.json())

const server = app.listen(process.env.PORT || 3000, function () {
  const host = server.address().address
  const port = server.address().port
  console.log('Server listening at http://%s:%s', host, port)
})
