const express = require('express')
const router = express.Router()
const users = require('./modules/users')
const admin = require('./modules/admin')
const { apiErrorHandler } = require('../middleware/error-handler')

// route branch
router.use('/api/admin', admin)
router.use('/api/users', users)

router.get('/', (req, res) => {
  res.send('Hello world!')
})

// error handler
router.use('/', apiErrorHandler)

module.exports = router
