const express = require('express')

const router = express.Router()

const AuthRoutes = require('./auth/auth.routes')
const UserRoutes = require('./user/user.routes')

router.use('/auth', AuthRoutes)
router.use('/me', UserRoutes)

module.exports = router
