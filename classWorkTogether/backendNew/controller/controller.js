// require your schema
const dataBase = require("../model/model");
const bcrypt = require("bcrypt")
const myval = require("../middleware/validator")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.createUser = async (req,res)=>{
    // try & catch block to handle errors
    try {
        
        // get the users input
        const {fullName,email,password,phoneNumber,dateOfBirth,address,state,country} = req.body

        await myval.validateAsync(req.body)
        //  check if the user already exist
        const userEsixt = await dataBase.findOne({email})
        if (userEsixt) {
            return res.status(400).json({
                error: `user with ${email} already exist`
            })
        }

        // hash the password
        const saltpass = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,saltpass)

        // create the user
        const user = await dataBase.create({
            fullName,
            email: email.toLowerCase(),
            password: hash,
            phoneNumber,
            dateOfBirth,
            address,
            state,
            country
        })

        // throw response
      if(user){
        return   res.status(201).json({
            message: `user with ${user.email} created successfully`
        })
      }

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.Login = async (req,res)=>{
    try {
        
        // get the user input
        const {emailOrPhone, password} = req.body

        // check for user
        const userEmail = await dataBase.findOne({$or:[{email:emailOrPhone},{phoneNumber:emailOrPhone}]})
        if (!userEmail) {
            return res.status(400).json({
                error: "wrong email or phone number"
            })
        }
 
        // check for password
        const checkPassword = bcrypt.compareSync(password,userEmail.password)
        if (!checkPassword) {
            return res.status(400).json({
                error: "wrong password"
            })
        }

        const token = jwt.sign({
            userId:userEmail._id,
            email:userEmail.email
        },process.env.jwtKey, {expiresIn: "1d"})
        res.status(200).json({
            message:"user logged in successfully",
            data: token
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    } 
}