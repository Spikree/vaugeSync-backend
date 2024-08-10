import express from 'express'
import userSchema from '../schema/userSchema.js'
import authenticateToken from '../utils/auth.js'

const getUserInfo = express.Router();

getUserInfo.get('/',authenticateToken, async(req,res) => {
    const {user} = req.user || req.user.user

    const isUser = await userSchema.findOne({_id: user._id});

    if(!isUser) {
        return res.status(400).json({
            error: true,
            message: "user not found"
        })
    }

    return res.status(200).json({
        error: false,
        message: "fetched user data sucessfully",
        user : { name : isUser.name, email : isUser.email, _id: isUser._id}
    })
});

export default getUserInfo;