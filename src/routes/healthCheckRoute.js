const express = require('express')
const router = express.Router()


router.get('/health-check',(req,res)=>res.status(200).send({status:true,message:'App is successfully running.'}))

module.exports = router