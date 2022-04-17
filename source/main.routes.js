const express = require('express')

const router = express.Router()

const AuthRoutes = require('./auth/auth.routes')

router.use('/auth', AuthRoutes)

module.exports = router
