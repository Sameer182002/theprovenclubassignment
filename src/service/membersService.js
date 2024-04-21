const memberModel = require("../models/memberModel")


exports.createMembers = async(bodyData)=>{
    const data = await memberModel.insertMany(bodyData)
    return {status:true,code:201,data}
}
