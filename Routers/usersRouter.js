const express = require('express')
const {getUsers} = require('../controller/usersRouterController');
const fileUploader = require('../middlewares/Users/uploadavatar');
const { model } = require('mongoose');
const peopleScema = require('../model/pepole');
const users = express.Router();
const Pepoles = new model("People",peopleScema)
users.use(express.json()); 
const deleteUser = require("../middlewares/Users/DeleteUser"); 
const {addUserValidetor , validetionResult} = require("../middlewares/Users/userValidetor");
const addUserInDatabase = require('../middlewares/Users/addUserInDatabase');
const { isEmpty } = require('lodash');   
const chekUserdetails = require("../middlewares/common/chekuserdetails")
const chekUserRole = require("../middlewares/common/CheakUserRole");
const CurrentUser = require('../middlewares/Users/CurrentUser');

// routes 
users.get('/', chekUserdetails,chekUserRole ,getUsers);
users.get('/current',chekUserdetails ,CurrentUser )
users.post('/set' , chekUserdetails  , addUserValidetor , validetionResult  , addUserInDatabase , (req , res )=>{
        res.status(200).json({
            Success :{
               msg: "User created successfully" , 
           }               
     })    
})

users.delete("/:id", chekUserdetails , chekUserRole , deleteUser)
module.exports = users;
  