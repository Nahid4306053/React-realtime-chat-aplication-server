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
//Set for cros origin 
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', ['http://localhost:5173','http://localhost:3000/socket.io/']);
   res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
   res.header('Access-Control-Allow-Headers', ['Content-Type']); 
   next();
 });
 
// cors origin set 
app.use(cors({
   origin: ['http://localhost:5173'],
   credentials: true,
   sameSite: 'none'
}));

dotEnv.config();
const server = http.createServer(app)
const io = require("socket.io")(server, {
   cors: {
     origin: "http://localhost:5173",
     methods: ['GET','PUT','PATCH','POST','DELETE'],
     allowedHeaders: ["my-custom-header"],
     credentials: true
   }
 });

global.io = io ; 
 
// router imports
const login = require('./Routers/userloginRouter')
const users = require('./Routers/usersRouter')
const inbox = require('./Routers/inboxRouter')
  

// connect mongo 
mongoose.connect(process.env.MONGOSE_CONNECTION_STRING).then(()=>console.log("Database connection successfully")).catch((err)=>console.log(err))

//parsers 
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))

// set view engine 

//
app.use(express.static(path.join(__dirname,"public")))
// cookieParser 
app.use(cookieParser(process.env.SECRETKEY_KEY_F_COOKIE))

// routing setups
app.use('/login', login);  
app.use('/users' , users);
app.use('/inbox' , inbox); 
// err handeling
app.use(notFoundehandeler);
app.use(errorHandeler);

//listening port 
server.listen(process.env.PORT_DATABASE,()=>{
   console.log('Listening the port', process.env.PORT_DATABASE);                  
});        