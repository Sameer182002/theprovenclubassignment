const express = require('express');
const router = express.Router()
const booksController = require("../controller/booksController")

router.get('/',booksController.getAllBooks)
router.post('/',booksController.createBooks)
router.put('/checkout',booksController.createCheckout)

router.put('/return',booksController.createReturnRequest)
module.exports = router