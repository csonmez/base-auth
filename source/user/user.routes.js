const express = require('express')

const router = express.Router()

// const AuthorizationMiddleware = require('../common/middleware/authorization.middleware')
const UserController = require('./controllers/user.controller')

// router.use(AuthorizationMiddleware.checkUser)

router.route('/').get(UserController.getMe)

module.exports = router
