const app = require('./server') 

app.use('/',require('./routes/healthCheckRoute'))
app.use('/books',require('./routes/booksRoute'))
app.use('/members',require('./routes/membersRoute'))

module.exports = app