import express from 'express'
import userSchema from '../schema/userSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const createAccount = express.Router();

createAccount.post("/", async(req,res) => {
    const {name, email, password} = req.body;

    const requiredFields = [email, name, password];
    const fieldNames = ['email', 'name', 'password'];

    for (var i = 0 ; i < requiredFields.length ; i ++ ) {
        if(!requiredFields[i]) {
            return res.status(400).json({error: true, message: `${fieldNames[i]} is required`})
        }
    }

        const isUserPresent = await userSchema.findOne({email: email});

        if(isUserPresent) {
            return res.status(400).json({error: true, message: "user with this email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = new userSchema({
            name,
            email,
            password: hashedPassword
        })

        try {
            await user.save();

            const accessToken = jwt.sign({
                user
            }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "36000m"
            });

            return res.status(200).json({error: false, message: "Account created sucessfully",name, accessToken});

        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Error creating account"
            })
        }

    
});

export default createAccount;