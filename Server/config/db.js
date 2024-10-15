const mongoose = require('mongoose')
require('dotenv').config()

const connectDb  = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DataBase Connected Successful")
    } catch (error) {
        console.log(error,"Data Base Connected Failed")

    }
}


module.exports= connectDb