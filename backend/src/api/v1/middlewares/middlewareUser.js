const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();


const middlewareUser = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;

        if(token){
            const accessToken = token.split(" ")[1];

            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if( err ) return res.status(403).json("Token is not valid")

                req.user = user;
                next();
            })
        }else{
            return res.status(401).json("You're not authenticated")
        }
    }
}

module.exports = middlewareUser