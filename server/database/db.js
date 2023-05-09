import mongoose from "mongoose"


const db = () => {
    try {
        mongoose.connect(process.env.URL)
        console.log("database connected");
    } catch (error) {
        console.log("database connection failed");
    }


}

export default db