const booksCheckoutModal = require("../models/booksCheckoutModal")
const booksModel = require("../models/booksModel")
const memberModel = require("../models/memberModel")
const { SEVEN_DAYS_IN_MS, ONE_DAY_IN_MS } = require("../utils/constants")


exports.getAllBooks = async()=>{

    const booksData = await booksModel.find({
        isDeleted : false,
        NumberOfCopies : {$gt: 0}
    }).sort({BookID:1})

    return {status:true, code:200, data:booksData}
}


exports.createBooks = async(bodyData)=>{
    const data = await booksModel.insertMany(bodyData)
    return {status:true,code:201,data}
}

exports.createCheckout = async(userId,bookId)=>{
    const [memberDetails, bookDetails] = await Promise.all([
        memberModel.findOne({
            isDeleted : false,
            MemberID : userId
        }),
        booksModel.findOne({
            isDeleted : false,
            _id: bookId
        }).lean()
    ])

    if(!memberDetails){
        console.log('Sorry you are not registered member of library.')
        return {status : false, code : 404, message:'Sorry you are not registered member of library.'}
    }
    if(!bookDetails || bookDetails?.NumberOfCopies<1){
        console.log('Book not found.')
        return {status : false, code : 404, message:bookDetails?.NumberOfCopies<1 ? 'Book copies not available' :'Book Not found'}
    }

    const checkoutBooksDetails = await booksCheckoutModal.find({
        isDeleted : false,
        memberId : userId
    }).populate('book').lean()

    const {NumberOfCopies=0} = bookDetails || {}
    const isFinePendingForAnyBook = checkIsAnyBookReturnDateGone(checkoutBooksDetails) || {}
    if(Object.keys(isFinePendingForAnyBook)?.length){
        const dataToUpdate = []
        Object.keys(isFinePendingForAnyBook).forEach(id=>{
            dataToUpdate.push(
                { updateOne: {
                    filter: { 
                        book : id
                    },
                    update: { $set: { fine:  isFinePendingForAnyBook?.[String(id)]} }
                 } }
            )
        })

        if(dataToUpdate?.length){
            await booksCheckoutModal.bulkWrite(dataToUpdate)
        }
        console.log('Pending dues are available.')
        return {status:false,code:400,message:'Fine is due'}
    }

    const [updateBook,createCheckoutOfUser] = await Promise.all([
        booksModel.findOneAndUpdate({
            isDeleted : false,
            _id : bookId
        },{$set:{
            ...(NumberOfCopies>0 && {NumberOfCopies : NumberOfCopies -1})
        }}),
        booksCheckoutModal.create({
            book : bookDetails?._id,
            member : memberDetails?._id,
            checkoutDate : Date.now(),
            returnDate : Date.now() + SEVEN_DAYS_IN_MS
        })
    ])

    return {status : true, code: 200, message : 'Checkout successfully created.'}
}


function checkIsAnyBookReturnDateGone(booksData){
    const data = {}
    booksData.forEach((checkoutBook)=>{
        const {book={},returnDate,isReturnedByUser=false} = checkoutBook || {}
        const {_id} = book || {}
        if(returnDate > Date.now() && !isReturnedByUser){
            const totalFineDays = Math.floor((Date.now - returnDate)/ONE_DAY_IN_MS)
            data[String(_id)] = 50 * totalFineDays
        }
    })
    return data
}

exports.createReturnRequest = async(userId,bookId)=>{
    const [memberDetails, bookDetails] = await Promise.all([
        memberModel.findOne({
            isDeleted : false,
            MemberID : userId
        }),
        booksModel.findOne({
            isDeleted : false,
            _id: bookId
        }).lean()
    ])

    if(!memberDetails){
        console.log('Sorry you are not registered member of library.')
        return {status : false, code : 404, message:'Sorry you are not registered member of library.'}
    }
    if(!bookDetails){
        console.log('Book not found.')
        return {status : false, code : 404, message:'Book Not found'}
    }

    const isBookCheckoutByUser = await booksCheckoutModal.findOne({
        isDeleted:false,
        book : bookDetails?._id,
        member : memberDetails?._id
    })

    if(!isBookCheckoutByUser){
        return {status : false, code : 404, message:'Sorry you had not created the order of this book'}
    }

    const {returnDate=0, isReturnedByUser} = isBookCheckoutByUser || {}

    if(isReturnedByUser){
        return {status : false, code : 404, message:'Sorry you had not created the order of this book'}
    }

    if(returnDate<Date.now()){
        const totalFineDays = Math.floor((Date.now - returnDate)/ONE_DAY_IN_MS)
        return {status:false,code:400, message : `You have to pay the fine for overdues the book borrowdate ${totalFineDays * 50}`}
    }

    await booksCheckoutModal.findOneAndUpdate({
        isDeleted:false,
        book : bookDetails?._id,
        member : memberDetails?._id
    },{$set:{
        isReturnedByUser : true
    }})
    const {NumberOfCopies=0} = bookDetails || {}
    await booksModel.findOneAndUpdate({
        isDeleted : false,
        _id: bookDetails?._id
    },{$set : {
        NumberOfCopies : NumberOfCopies + 1
    }})

    return {status : true , code: 200, message : 'Returned successfuly' }
}