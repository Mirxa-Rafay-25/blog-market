const express = require('express')
const mongoose  = require('mongoose')
const app = express()
const dotenv = require('dotenv') 
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')

// database

const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected successfully!")

    }
    catch(err){
        console.log(err)
    }
}

// middlewares
dotenv.config()
app.use(express.json())
const corsOptions = {
    origin: 'https://blog-market-frontend.vercel.app', // Allow your frontend domain
    methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
    credentials: true, // Allow cookies if needed
  };
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)

app.options('*', cors(corsOptions)); // Allow preflight requests


app.get("/",(req,res)=>{
    res.send("server is running");
})

app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("app is running on port "+process.env.PORT)
})
