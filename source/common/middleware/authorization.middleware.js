const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const passport = require('passport')
const UserModel = require('../../user/models/user.model')

exports.checkUser = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization.split(' ')

        if (authorization[0] !== 'Bearer' || !authorization[1]) {
            throw new Error({ status: 400 })
        }

        req.decoded_jwt = jwt.decode(authorization[1], { complete: true })
        req.jwt = jwt.verify(authorization[1], process.env.JWT_KEY)
        const result = await bcrypt.compare(process.env.JWT_KEY, req.jwt.hash)
        // console.log("req.jwt", req.jwt)
        if (!req.isAuthenticated()) {
            const user = await UserModel.findById(req.jwt.id, 'email password').lean()
            await user.authenticate(user.password)
        }
        next()
    } catch (err) {
        console.log("err", err)
        next()
    }
}
