// external exportt
const express = require('express');
const dotEnv = require('dotenv')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path')
const http = require("http"); 
const cors = require("cors")
// iternal import  
const {errorHandeler , notFoundehandeler} = require('./middlewares/common/errorHandelar')
const app = express()

// cors origin set 
app.use(cors({
   origin: ['http://localhost:5173', 'https://chitchatv2.netlify.app'],
   methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
   credentials: true,
   optionsSuccessStatus: 204, 
 }));

dotEnv.config();
const server = http.createServer(app)

// router imports
const login = require('./Routers/userloginRouter')
const users = require('./Routers/usersRouter')
const inbox = require('./Routers/inboxRouter');
const multer = require('multer');
  

// connect mongo 


//parsers 
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))

// set view engine 
const uploadinstane = multer({
   storage : multer.memoryStorage,
})
//
app.use(uploadinstane.any())
app.use(express.static(path.join(__dirname,"public")))
// cookieParser 
app.use(cookieParser(process.env.SECRETKEY_KEY_F_COOKIE))

// routing setups
app.use('/users' , users);
app.use('/login', login);  
app.use('/inbox' , inbox); 

// err handeling
app.get("/",(req,res)=>{
   res.send("Server is running.....")
})
app.use(notFoundehandeler);
app.use(errorHandeler);

//listening port 
mongoose.connect(process.env.MONGOSE_CONNECTION_STRING).then(()=>(
   app.listen(process.env.PORT_DATABASE,()=>{
   console.log('Listening the port', process.env.PORT_DATABASE);                  
}), 
console.log("Database connection successfully"))
).catch((err)=>console.log(err))
        