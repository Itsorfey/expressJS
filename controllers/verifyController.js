import Auth from '../models/Auth.js';
import jwt from 'jsonwebtoken'

const verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Auth.findOneAndUpdate({ email: decoded.email }, { verified: true })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.redirect(`http://localhost:3000/verify-email/${token}`);
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'VERIFY ERROR' })
    }
}

export { verifyEmail }