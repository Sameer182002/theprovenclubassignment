const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { JWT_PRIVATE_KEY } = require('../utils/constants');

const booksSchema = mongoose.Schema({
    BookID : {
        type : Number,
        trim : true
    },
    BookName : {
        type : String,
        trim : true
    },
    NumberOfCopies : {
        type : Number,
        trim : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},{timestamps:true})

module.exports = mongoose.model('book',booksSchema)