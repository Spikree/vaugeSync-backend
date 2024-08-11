import express from 'express';
import authenticateToken from '../utils/auth.js';
import userSchema from '../schema/userSchema.js';
import bcrypt from 'bcrypt';

const changePassword = express.Router();

changePassword.patch('/', authenticateToken, async (req, res) => {
    const { user } = req.user || req.user.user;
    const { existingPassword, newPassword, reTypedNewPassword } = req.body;

    if (newPassword !== reTypedNewPassword) {
        return res.status(400).json({
            error: true,
            message: "Re-typed password doesn't match the new password",
        });
    }

    try {
        const User = await userSchema.findById(user._id);

        if (!User) {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(existingPassword, User.password);

        if (!isMatch) {
            return res.status(401).json({
                error: true,
                message: "current password is incorrect",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        User.password = hashedPassword;
        await User.save();

        return res.status(200).json({
            error: false,
            message: "Password changed successfully!",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Internal server error",
        });
    }
});

export default changePassword;
