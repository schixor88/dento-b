const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = async(req, res, next)=>{
    try {
        //1. destruct header
        const jwtToken = req.header("token");
        //2. check if token exists 
        if(!jwtToken){
            return res.status(403).json("Not Authorized");
        }
        //3. check jwt token
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = payload.user
        
    } catch (err) {
        console.error(err.message)
        return res.status(403).json("Not Authorized");
    }
}