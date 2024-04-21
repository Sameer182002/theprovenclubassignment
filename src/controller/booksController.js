const booksService = require("../service/booksService")
const { isValidObjectId } = require("../utils/validator")

exports.getAllBooks = async(req,res)=>{
    try{
        const {status,code,message,data} = await booksService.getAllBooks()
        return res.status(code || 200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log(`Error while fetching all the books :`,error?.message)
        return res.status(500).send({
            status: false,
            message : `Error while fetching all the books : ${error?.message}`
        })
    }
}

exports.createBooks = async(req,res)=>{
    try{
        const {booksData=[]} = req?.body || {}
        if(!booksData?.length){
            console.log('No data present to update')
            return res.status(400).send({
                status:false,
                message:"No data present to update'"
            })
        }
        const {status,code,message,data} = await booksService.createBooks(booksData)
        return res.status(code || 200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log(`Error while creating all the books :`,error?.message)
        return res.status(500).send({
            status: false,
            message : `Error while creating all the books : ${error?.message}`
        })
    }
}


exports.createCheckout = async(req,res)=>{
    const {userId='',bookId=''} = req?.body || {}

    try{
        if(!userId || !bookId){
            return res.status(400).send({
                status : false,
                message :'User Id and book id must be present to checkout any book.'
            })
        }
        if(!isValidObjectId(bookId)){
            return res.status(400).send({
                status : false,
                message :'Invalid Book Id'
            })
        }
        const {data,status, code, message} = await booksService.createCheckout(userId,bookId)
        return res.status(code || 200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log(`Error while checkout the book:`,error?.message)
        return res.status(500).send({
            status : false,
            message : `Error while checkout the book: ${error?.message}`
        })
    }
}

exports.createReturnRequest = async(req,res)=>{
    const {bookId='',userId=''} = req?.body || {}
    try{
        if(!userId || !bookId){
            return res.status(400).send({
                status : false,
                message :'User Id and book id must be present to checkout any book.'
            })
        }
        if(!isValidObjectId(bookId)){
            return res.status(400).send({
                status : false,
                message :'Invalid Book Id'
            })
        }
        const {data,status, code, message} = await booksService.createReturnRequest(userId,bookId)
        return res.status(code || 200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log('Error while creating return request',error?.message)
        return res.status(500).send({
            status : false,
            message : `Error while creating return request: ${error?.message}`
        })
    }
}