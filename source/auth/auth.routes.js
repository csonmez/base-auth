const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')

const router = express.Router()

const UserModel = require('../user/models/user.model')

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

router.route('/login').post([passport.authenticate('local'), async (req, res) => {
    try {
        // console.log("req",req.user)

        req.session.userId = req.user._id
        req.session.save()
        res.status(200).json(req.user)
    } catch (err) {
        console.log('err', err)
        res.sendStatus(400)
    }
}])

router.route('/me').get(async (req, res) => {
    try {
        console.log('req', req.user)
        res.status(200).json(req.user)
    } catch (err) {
        console.log('err', err)
        res.sendStatus(400)
    }
})

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
