const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = express.Router()

const UserModel = require('../user/models/user.model')
const midd = require('../common/middleware/authorization.middleware')

router.route('/register').post(async (req, res) => {
    try {
        console.log('req.body', req.body)
        const register = await UserModel.register(new UserModel({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        }), req.body.password)
        res.status(200).json(register)
    } catch (err) {
        console.log('err', err)
        res.sendStatus(400)
    }
})

router.route('/login').post([/*passport.authenticate('local'), */async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })

        const user2 = await UserModel.authenticate(user.password)

        console.log("user", user2)

        const hash = await bcrypt.hash(process.env.JWT_KEY, 5)
        const token = await jwt.sign({ id: /*req.*/user.id, hash }, process.env.JWT_KEY/*, { expiresIn: 300 }*/)

        req.session.userId = user.id
        req.session.save()
        res.status(200).json({ token/*, user: req.user*/ })
    } catch (err) {
        console.log('err', err)
        res.sendStatus(400)
    }
}])

router.route('/me').get([midd.checkUser, async (req, res) => {
    try {
        // console.log('req', req.user)
        console.log('req.user', req.isAuthenticated())

        if (!req.user) {
            res.sendStatus(423)
            return
        }
        res.status(200).json(req.user)
    } catch (err) {
        console.log('err', err)
        res.sendStatus(400)
    }
}])

router.route('/deneme').get(async (req, res) => {
    try {
        console.log('req', req.user)
        if (!req.user) {
            res.sendStatus(400)
            return
        }
        res.status(200).json(req.user)
    } catch (err) {
        console.log('err', err)
        res.sendStatus(400)
    }
})

module.exports = router
