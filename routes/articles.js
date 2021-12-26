const router = require('express').Router()
const { authVerify } = require('./verifyToken.js')

router.get('/', authVerify, (req, res) => {
    res.json({
        articles: {
            title: "Example article",
            description: "A example of random data"        }
    })
})

module.exports = router