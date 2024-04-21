const memberService = require("../service/membersService")

exports.createMembers = async(req,res)=>{
    try{
        const {membersData=[]} = req?.body || {}
        if(!membersData?.length){
            console.log('No data present to update')
            return res.status(400).send({
                status:false,
                message:"No data present to update'"
            })
        }
        const {status,code,message,data} = await memberService.createMembers(membersData)
        return res.status(code || 200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log(`Error while creating all the members :`,error?.message)
        return res.status(500).send({
            status: false,
            message : `Error while creating all the members : ${error?.message}`
        })
    }
}