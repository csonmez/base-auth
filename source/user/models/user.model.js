const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true })

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    populateFields: ['name']
})

module.exports = mongoose.model('User', UserSchema)
