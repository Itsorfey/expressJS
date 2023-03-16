import Auth from '../models/Auth.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const findUser = await Auth.findOne({ email })
        if (!findUser) {
            const errors = [{ param: 'no in DB', msg: 'no user in DB' }]
            return res.status(401).json({ errors })
        }
        const match = await bcrypt.compare(password, findUser.hash_pass)
        if (!match) {
            const errors = [{ param: 'password', msg: 'Invalid Password' }]
            return res.status(401).json({ errors })
        }
        const token = jwt.sign(
            { email: findUser.email }, process.env.JWT_SECRET
        )
        res.status(200).json({
            token,
            status: 'ok'
        })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }

}

export { loginUser }