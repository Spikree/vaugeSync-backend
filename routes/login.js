import express from 'express';
import userSchema from '../schema/userSchema.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';



const login = express.Router();

login.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ error: true, message: "Please enter a password" });
  }

  try {
    const userInfo = await userSchema.findOne({email: email});

    if(!userInfo) {
        return res.status(400).json({error: true, message: "user not found"});
    }

    const isMatch = await bcrypt.compare(password,userInfo.password);

    if(userInfo.email == email && isMatch) {
        const user = { user: userInfo}
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn : "36000m",
        })

        return res.json({
            error: false,
            message: "logged in sucessfully",
            email,
            accessToken
        })
    } else {
        return res.status(400).json({
            message: "invalid password or email"
        })
    }
  } catch (error) {
    return res.status(400).json({
        error: true,
        message: "internal server error"
    })
  }
});

export default login;
