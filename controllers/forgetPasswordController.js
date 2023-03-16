import Auth from '../models/Auth.js'
import bcrypt from 'bcrypt'
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
const forgetPassword = async (req, res) => {
    try {
        const { email, password, confirmNumbers } = req.body
        const mailOptions = {
            from: process.env.MAILRU_EMAIL,
            to: email,
            subject: 'new password',
            html: `<p>Ваш новый пароль: ${password} </a>`,
        };
        const findUser = await Auth.findOne({ email })
        if (findUser) {
                const hashPass = await bcrypt.hash(password, 10)
                await Auth.findByIdAndUpdate(findUser._id, { hash_pass: hashPass })
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'ERROR' });
            } else {
                res.status(201).json({
                    message:
                        'SUCCESS',
                });
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error user' });
    }

}

export { forgetPassword }