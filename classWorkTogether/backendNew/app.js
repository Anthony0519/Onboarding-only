//require express 
const expresss = require("express")
const mongoose = require("mongoose")
const router = require("./Router/router")
const cors = require("cors")

// an instance of express
const app = expresss()
app.use(cors())
app.use(expresss.json())
app.use(router)

// call the mongoDB url and port from dotenv
require("dotenv").config()
const port = process.env.port
const dBpass = process.env.dbLink

// connect to dataBase
mongoose.connect(dBpass).then(()=>{
    console.log("dataBase established")

    app.listen(port, ()=>{
        console.log(`server on port: ${port}`);
    })
})