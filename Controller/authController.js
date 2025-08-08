const jwt = require('jsonwebtoken')
const User = require('../Models/User')

// Registering a new user
const register = async (req, res) =>{
    try{
        const {name, email, password, role} = req.body;

        // Check if user already exists
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success: false,
                message: 'User already exist'
            })
        }

        // Save new user in DB
        user = await User({name, email, password, role}).save()
        res.status(201).json({
            success: true,
            message: user
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// Login user

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        console.log(req)
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User does not exist'
            })
        }
        if(user.password !== password){
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            })
        }
        
        const token = jwt.sign({id: user._id}, "addedsecret", {expiresIn: '6m'})
        return res.status(200).json({
            token
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// Proctected route example
const prof = async (req, res) => {
    try{
        const id = req.user.id 
        return res.status(200).json({
            success: true,
            user: await User.findById(id).select('-password -role')
        })
    }
    catch (err) {
        return res.status(500).json({
            success : false,
            message: err.message 
        })
    }
}

module.exports = { register, login, prof }