import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const authenticateToken = (req,res,next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.sendStatus(401).json({message: "unauthorised to access this"});
    
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if(err) return res.sendStatus(401)
        req.user = user;
        next();
    })
}

export default authenticateToken;