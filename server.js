require('./source/common/services/mongoose.service')

const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const routes = require('./source/main.routes')
const User = require('./source/user/models/user.model')

const app = express()

app.use(cors({
    // origin: process.env.NODE_ENV === 'production' ? 'https://quo.vote' : true,
    credentials: true
}))
app.set('trust proxy', 1)
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://cemsonmez:123qwe()..@cluster0.jitv5.mongodb.net/base-auth?retryWrites=true&w=majority',
            stringify: false
        }),
        secret: 'thisissupposedtobeasecret',
        saveUninitialized: false, // don't create session until something stored
        resave: false, //don't save session if unmodified
        cookie: {
            maxAge: 5 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' && 'none',
            secure: process.env.NODE_ENV === 'production'
        }
    })
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(routes)

app.listen(3000, () => {
    console.log(`App started at port 3000`)
})

module.exports = app
