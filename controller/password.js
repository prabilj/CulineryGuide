const User = require('../model/userschema');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();
// const dotenv = require('dotenv')
//const Password = process.env.password
//const email = process.env.email


async function generateResetToken() {
    return crypto.randomBytes(20).toString('hex');
}

// const sendPasswordResetEmail = async (email, resetToken) => {
//     console.log(process.env.password)
//     let password = process.env.password
//     let senderemail = process.env.email

//     const transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: senderemail,
//             password: password
//         }
        
//     });
    const sendPasswordResetEmail = async (email, resetToken) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.email, // Use the email address, not process.env.email
            pass: process.env.password // Use the App Password generated above
        }
    });


    const mailOption = {
        // from: senderemail,
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: http://localhost:3000/reset-password/${resetToken}`
    };
    
     try {
        await transporter.sendMail(mailOption);

     }catch (error){
        console.error(error)
     } 
};

const forgotPasswordHandler = async (req, res) => {
    try {
        const { email } = req.body;
        const exist = await User.findOne({ email });

        if (!exist) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = await generateResetToken();

        // Update the existing user's properties
    
        let resetTokenExpiration = Date.now() + 3600000;

        // Save the updated user
        await User.updateOne(
            {_id:exist._id},
            {$set:{resetToken:resetToken,resetTokenExpiration:resetTokenExpiration}})

            // Send the password reset email
        await sendPasswordResetEmail(exist.email, resetToken);

        return res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};




const updatePassword = async (req, res) => {
    try {
        const { user_id, currentPassword, newPassword } = req.body

    console.log('user_id:', user_id)
    console.log('currentpassword:', currentPassword)
    console.log('newPassword:', newPassword)

        const user = await User.findById(user_id)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const passwordMatch = await bcrypt.compare(currentPassword, user.password)

        if (!passwordMatch) {
            return res.status(400).json({ error: 'current password is incorrect' })
        }

        const hashedPassword = await bcrypt.hash( newPassword, 10 ) 
        user.password = hashedPassword
        await user.save()
        
        res.json({ message: 'password update sucessfully' })
    } 
     catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })

    }
}
module.exports = { updatePassword,forgotPasswordHandler }

