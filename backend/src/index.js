import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from 'dotenv'
import connectDB from "./db.js"
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import  applicationRoute  from "./routes/application.route.js"
import  messageRoute  from "./routes/message.route.js"
import { app, server } from "./socket/socket.js"
dotenv.config({})

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions))



// api's
app.use("/api/v1/user", userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)
app.use("/api/v1/messages",messageRoute)

// const port = process.env.PORT || 3000
const port=8000
connectDB().then(()=>{
    server.listen(port ,()=>{
        console.log(`APP IS LISTENING ON PORT ${port}`)
    })
}).catch((error)=>{
    console.log(error)
})