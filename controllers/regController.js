import Auth from '../models/Auth.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAILRU_EMAIL,
        pass: process.env.MAILRU_PASSWORD,
        authMethod: 'LOGIN'
    },
    tls: {
        rejectUnauthorized: false
    }
});
const registerUser = async (req, res) => {
    console.log('CHECK IN BACKEND')
    try {
        const { name, email, password } = req.body

        const findUser = await Auth.findOne({ email })

        if (findUser) {
            return res.status(401).json({ message: 'This user exists' })
        }

        const hashPass = await bcrypt.hash(password, 10)
        const user = await Auth.create({
            name,
            email,
            hash_pass: hashPass,
            verified: false
        })
        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id

            }, process.env.JWT_SECRET
        )
        // Verification logic
        const verificationLink = `https://itsorfey.onrender.com/auth/verify-email/${token}`;        const mailOptions = {
            from: process.env.MAILRU_EMAIL,
            to: email,
            subject: 'Email Verification',
            html: `<p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">${verificationLink}</a>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error sending verification email' });
            } else {
                console.log(`Email sent: ${info.response}`);
                res.status(201).json({
                    message:
                        'Register success. Please check your email to verify your account',
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error registering user' });
    }

}

export { registerUser }