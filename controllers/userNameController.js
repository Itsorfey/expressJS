import Auth from "../models/Auth.js"

const getUsername = async (req, res) => {
    const { email } = req.user
    const user = await Auth.findOne({ email })
    try {
        res.status(200).json({
            username: user.name,
            verified: user.verified
        })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
}

export { getUsername }