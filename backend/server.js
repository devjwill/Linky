require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const homeRoutes = require('./routes/home')
const adminRoutes = require('./routes/admin')

//Express App
const app = express()

//Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.use('/api/user', userRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);


//Connect to DataBase
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening on port ' + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
