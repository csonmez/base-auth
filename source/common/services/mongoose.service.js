const mongoose = require('mongoose')

let count = 0

const options = {
    autoIndex: true
}

mongoose.set('toObject', { virtuals: true })
mongoose.set('toJSON', { virtuals: true })

const connectWithRetry = async () => {
    console.log('MongoDB connection with retry')

    try {
        await mongoose.connect('mongodb+srv://cemsonmez:123qwe()..@cluster0.jitv5.mongodb.net/base-auth?retryWrites=true&w=majority', options)
        console.log('MongoDB is connected')
    } catch (error) {
        setTimeout(connectWithRetry, 5000)
        throw new Error(`MongoDB connection unsuccessful, retry after 5 seconds. ${++count}`)
    }
}

connectWithRetry()

module.exports = { mongoose }
