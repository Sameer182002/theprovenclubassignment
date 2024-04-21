const express = require('express');
const router = express.Router();
const memberController = require("../controller/membersController")

router.post('/',memberController.createMembers)


module.exports = router