// Validation
const Joi = require('@hapi/joi')


module.exports = {
    registerValidation: (requestBody) => {
        const schema = Joi.object({
            name: Joi.string().min(6).required(),
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()
        })
        //Lest validate the data before we used
        const { error } = schema.validate(requestBody)
        if (error) {
            return {pass: false, message: error.details[0].message}
        }
        return {pass: true, message: "Validation sucessfull"}
    },
    loginValidation: (requestBody) => {
        const schema = Joi.object({
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()
        })
        //Lest validate the data before we used
        const { error } = schema.validate(requestBody)
        if (error) {
            return {pass: false, message: error.details[0].message}
        }
        return {pass: true, message: "Validation sucessfull"}
    }
}

