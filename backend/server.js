const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middlewares/errorMiddleware')
const mongoose = require ('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3001
 app = express()
 app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials:true,
  
    })
  )
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 
 const connectDB = mongoose.connect( 'mongodb://localhost:27017/incubation' );
 const db = mongoose.connection;
 db.on("error", console.error.bind(console, "connection error:"));
 db.once("open", () => {
     console.log("Database connected".cyan.underline);
 })
 

app.use('/',require('./routes/user'))
app.use('/admin',require('./routes/admin')) 


app.use(errorHandler)

app.listen(port,()=>console.log(`Server Running on port ${port}`.magenta.underline)) 