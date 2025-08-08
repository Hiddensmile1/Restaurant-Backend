const express = require ("express");
const jwt = require ("jsonwebtoken");
// const { connect } = require("mongoose");
const authRoutes = require('./Routes/authRoute')
require ('dotenv').config();
const connectDB = require('./config/db')

connectDB()
const app = express ();

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "On root page"
    })
})

app.use('/api/v1/auth', authRoutes)

// app.get('/token', async (req, res) => {
//     let data = {
//         "email" : 'cool.com',
//         "age": 100
//     }

//     // Creating a jwt signature
//     const token = jwt.sign(data, 'mysecret', {expiresIn: '2m'})

//     res.status(200).json({token})
// })



app.listen (process.env.PORT, ()=> console.log (`Server started at http://localhost:${process.env.PORT}`))