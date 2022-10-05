const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name:String,
    author:String,
    genre:String,
    userID:String
    
})

module.exports = mongoose.model('books', bookSchema)
