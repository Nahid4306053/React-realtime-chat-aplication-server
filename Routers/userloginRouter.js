const express = require('express')
const login = express.Router();
const { model } = require('mongoose');
const { chekUser  } = require('../controller/loginRouterController')
const chekUserdetails = require("../middlewares/common/chekuserdetails")
const dotenv = require('dotenv').config();
const {
  logindatavalidetion,
  getvalidetionResult  
} = require("../middlewares/userLogIn/loginDatavalidetion");
const peopleScema = require('../model/pepole');
const Pepoles = new model("People", peopleScema)
login.post("/", logindatavalidetion, getvalidetionResult, chekUser)
login.delete("/" , chekUserdetails , async (req, res) => {
  try { 
    const getUser = await Pepoles.findOne({
      "_id": req.currentUser._id
    });
    if (getUser._id) {
        res.clearCookie(process.env.COOKIE_NAME)
        res.status(200).json({success:"user log out success"})
    } else {
      res.status(200).json({error:"Not to able log out"})
    }

  } catch (err) {
    console.log(err)
  }
})
// expoert the router 
module.exports = login;
