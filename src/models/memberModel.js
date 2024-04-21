const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const memberSchema = mongoose.Schema({
    MemberID : {
        type : Number,
        trim : true
    },
    MemberName : {
        type : String,
        trim : true
    },
    isDeleted: {
        type : Boolean,
        default : false
    },
    checkoutBooksIds : {
        type : [ObjectId],
        ref : 'book'
    },
    fineOfBooks : {
        type : Object
    }
},{timestamps : true})

module.exports = mongoose.model('Member',memberSchema)