const {
  model
} = require('mongoose');
const peopleScema = require('../../model/pepole');
const Pepoles = new model("People", peopleScema)
const path = require("path");
const bcrypt = require("bcryptjs")
const addUserInDatabase = async (req, res , next) => {
  let newUser = {};
  var salt = bcrypt.genSaltSync(10);
  var hashedpassword = bcrypt.hashSync(req.body.password, salt);
  if (req.files.length > 0) {
    newUser = {
      ...req.body,
      password: hashedpassword,
      avatar: req.files[0].filename
    }

  } else {
    newUser = {
      ...req.body,
      password: hashedpassword,
    }
  }

  const saveUser =  Pepoles(newUser)
  const  save =  await  saveUser.save();
   
  next();                
}

module.exports = addUserInDatabase;
  