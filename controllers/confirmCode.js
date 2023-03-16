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
const confirmCode = async (req, res) => {
    try {
        const { email, randomNumbers, confirmNumbers } = req.body
        console.log(req.body);
        if (randomNumbers && confirmNumbers === '') {
            transporter.sendMail({
                from: process.env.MAILRU_EMAIL,
                to: email,
                subject: 'код подтверждения',
                html: `<p>Ваш код подтверждения: ${randomNumbers} </a>`,
            },
                (error) => {
                    if (error) {
                        return res.status(500).json({ message: 'ERROR' });
                    } else {
                        res.status(201).json({
                            message:
                                'SUCCESS',
                        });
                    }
                });
        }
        if (randomNumbers == confirmNumbers) {
            return res.status(200).send({ verify: true })
        } else {
            return res.status(400).send({ message: 'код подтверждения неверный' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Error user' });
    }
}

export { confirmCode }