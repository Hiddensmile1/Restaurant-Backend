const jewt = require('jsonwebtoken');

const authMiddleware = (req, res, next) =>{
    const token = req.headers['authorization'].split(' ')[1]

    if (!token){
        return res.status(401).json({
            success: false,
            message: 'No token provided, authorization denied'
        })
    }
    try{
        const decoded = jwt.verify(token, "addedsecret")
        req.user = decoded
        next()
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'token is not valid'
        })
    }
}

module.exports = authMiddleware;