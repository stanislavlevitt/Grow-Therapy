const path = require('path')
const express = require('express')
const PORT = process.env.PORT || 8080
const app = express()

module.exports = app

const createApp = () => {

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended:true}))

  // api routes
  app.use('/api', require('./api'))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}.`)
  })
}

async function bootApp() {
  await createApp()
  await startListening()
}

if (require.main === module) {
  bootApp()
} else {
  createApp()
}
