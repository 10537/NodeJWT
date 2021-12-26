const router = require('express').Router()
const User = require('../model/User.js')
const { registerValidation } = require('../validation.js')
const bcrypt = require('bcryptjs')


router.post('/register', async (req, res) => {

    const {pass, message} = registerValidation(req.body)
    console.log(`Validation pass: ${pass} - ${message}`)

    if (!pass) {
        return res.status(400).send(message)
    }

    const emailExists = User.findOne({email: req.body.email}).lean()

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
        res.send(savedUser)
    } catch (err) {
        res.status(400).send(err)
    }
})


module.exports = router