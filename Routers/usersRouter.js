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
const chekUserdetails = require("../middlewares/common/chekUserdetails")
const chekUserRole = require("../middlewares/common/CheakUserRole");
const CurrentUser = require('../middlewares/Users/CurrentUser');

// routes 
users.get('/', chekUserdetails,chekUserRole ,getUsers);
users.post('/set' , chekUserdetails , fileUploader , addUserValidetor , validetionResult  , addUserInDatabase , (req , res )=>{
        res.status(200).json({
            Success :{
               msg: "User created successfully" , 
           }               
     })    
})
users.get('/current',chekUserdetails ,CurrentUser )
users.delete("/:id", chekUserdetails , chekUserRole , deleteUser)
module.exports = users;
  