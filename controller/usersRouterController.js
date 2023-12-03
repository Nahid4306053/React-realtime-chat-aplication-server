const { model } = require('mongoose');
const peopleScema = require('../model/pepole');
const { isEmpty } = require('lodash');
const Pepoles = new model("People",peopleScema)
const getUsers = async (req, res, next) => {
  try{
    const users = await Pepoles.find({}).select("name email avatar")
      res.status(200).json({users:users})   
 
  }
   catch(err){
    next(err)
   }
}
module.exports = {
  getUsers         
}    
         