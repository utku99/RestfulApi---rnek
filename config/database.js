const mongoose = require("mongoose")


const db = () => {
    mongoose.connect(process.env.MONGO_URI)
    try {
        console.log("mongodb connected");
    } catch (error) {
        console.log(error);
    }
}


module.exports = db

