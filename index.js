const express = require('express')
const app = express()
const port = process.env.port || 8080

app.get('/', (req, res) => {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log(`ip ${ip}, type ${typeof ip}`)
  res.send(`ip ${ip}`)
})

app.listen(port, () => {
  console.log(`Server app listening`)
})
