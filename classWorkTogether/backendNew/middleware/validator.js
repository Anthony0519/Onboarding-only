const joi = require("joi")

const validate = joi.object({
    fullName:joi.string().regex(/^[A-Za-z]+$/).min(3).max(30).required(),
    email:joi.string().email().required(),
    password: joi.string().min(8).max(16).required(),
    phoneNumber: joi.string().min(10).max(11).required(),
    dateOfBirth: joi.string().required(),
    address: joi.string().required(),
    state: joi.string().required(),
    country: joi.string().required(),
})

module.exports = validate