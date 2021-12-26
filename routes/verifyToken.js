const JWT = require('jsonwebtoken')

module.exports = {
    authVerify: (req, res, next) => {
        const token = req.header('auth-token')
        if (!token) return res.status(401).send('Access denied')

        try {
            const verified = JWT.verify(token, process.env.TOKEN_SECRET)
            req.user = verified
            next()
        } catch (err){
            console.error(err)
            return res.status(400).send('Invalid token')
        }
    }
}