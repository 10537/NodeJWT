const router = require('express').Router()
const User = require('../model/User.js')
const { registerValidation, loginValidation } = require('../validation.js')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')


router.post('/register', async (req, res) => {

    const {pass, message} = registerValidation(req.body)
    console.log(`Validation pass: ${pass} - ${message}`)

    if (!pass) {
        return res.status(400).send(message)
    }

    const emailExists = await User.findOne({email: req.body.email}).lean()

    if (emailExists) {
        return res.status(400).send("Email already exists")
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    try {
        const savedUser = await user.save()
        res.send({user: savedUser._id})
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {
    const {pass, message} = loginValidation(req.body)
    console.log(`Validation pass: ${pass} - ${message}`)

    if (!pass) {
        return res.status(400).send(message)
    }

    const user = await User.findOne({email: req.body.email}).lean()

    if (!user) {
        return res.status(400).send("Invalid eamil or password")
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPass) return res.status(400).send("Invalid eamil or password")

    //Create JWT
    const token = JWT.sign({_id: user._id}, process.env.TOKEN_SECRET)
    return res.header('auth-token', token).send(token)

})

module.exports = router