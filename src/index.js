const mongoose = require('mongoose')

require('./expressServer')

mongoose.connect('mongodb+srv://1978sameerbajaj:Sameer2002@cluster0.mabhqid.mongodb.net/')
.then(res=>console.log('database connected'))
.catch(err => console.error(err))