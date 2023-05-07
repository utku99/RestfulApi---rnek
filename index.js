const express = require("express")
const cors = require("cors")
const db = require("./config/database")
const dotenv = require("dotenv").config()
const authRouter = require("./routes/auth")
const postRouter = require("./routes/post")

const app = express()

app.use(cors())
app.use(express.json({limit: "30mb", extended: true})) 
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use("/",authRouter)
app.use("/",postRouter)

app.get("/",(req,res)=>{
    res.json({msg: "ana sayfa"})
})




const PORT = process.env.PORT || 8000


db()

app.listen(PORT,()=>{
    console.log("server is running on port: "+ PORT);
})