const express = require('express')
const app = express()
const multer = require('multer');
const cors = require("cors")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer().any())
app.use(cors())


app.listen(3003, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening to 3001`);
});

module.exports = app
