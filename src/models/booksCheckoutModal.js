const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


const checkoutSchema = mongoose.Schema({
    book : {
        type : ObjectId,
        ref : 'book'
    },
    member : {
        type : ObjectId,
        ref : 'Member'
    },
    checkoutDate : Number,
    fine : Number,
    returnDate : Number,
    isDeleted:{
        type : Boolean,
        default : false
    },
    isReturnedByUser : {
        type : Boolean,
        default : false
    }
},{timestamps: true}) 

module.exports = mongoose.model('booksCheckout ',checkoutSchema)