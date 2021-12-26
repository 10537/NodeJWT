const express = require('express')
const app = express()
const authRoute = require('./routes/auth.js')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

//Load config file
dotenv.config({ path: './config/config.env'})

//Connect DB
mongoose.connect( process.env.DB_CONNECT, 
() => {
    console.log("Connected to MongoDB")
})

//Middleware
app.use(express.json())


//Route Middleware 
app.use('/api/user', authRoute)


app.listen(3000, () => console.log("Server up and running"))