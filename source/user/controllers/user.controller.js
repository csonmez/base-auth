const UserModel = require('../models/user.model')

exports.getMe = async (req, res) => {
    try {
        console.log("req.user", req.isAuthenticated())
        if (!req.user) {
            res.sendStatus(424)
            return
        }
        const user = await UserModel.findById(req.user.id)

        if (!user) {
            res.status(423).end()
            return
        }

        res.status(200).json(user)
    } catch (err) {
        console.log("err", err)
        res.sendStatus(400)
    }
}
