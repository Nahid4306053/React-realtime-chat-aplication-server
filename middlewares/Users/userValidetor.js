const {
  check,
  validationResult
} = require("express-validator")
const {
  model
} = require("mongoose");
const peopleScema = require('../../model/pepole');
const Pepoles = new model("People", peopleScema)
const {
  unlink
} = require("fs");
const path = require('path');
const {
  isEmpty
} = require("lodash");


// add user
const addUserValidetor = [
  check('name')
  .isLength({min:1})
  .withMessage("Name is required")
  .isLength({
    min: 5,
    max: 20
  })
  .withMessage("Name minimam charecter 5 and max charecter 20")
  .isAlpha("en-US", {
    ignore: " -"
  })
  .trim(),
  check('email')
  .isLength({min:1})
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Invalid Email Address")
  .trim()
  .custom(async (value) => {
    try {
      const user = await Pepoles.findOne({
        email: value,
      })
      if (!isEmpty(user)){
        throw new Error('The Email already Exits')
      }
    } catch (err) {
      throw new Error(err)
    }
  }),
  check('mobile')
  .isLength({min:1})
  .withMessage("Mobile phone is required")
  .isMobilePhone('bn-BD')
  .withMessage("Moibile phone must be valid bangladeshi mobile")
  .custom(async (value) => {
    try {
      const user = await Pepoles.findOne({
        mobile: value,
      })
      if (!isEmpty(user)) {    
    throw Error('The Mobile number already Exits')
      }
    } catch (err) {
      throw new Error(err)
    }
  }),
   check('password')
  .isLength({min:1})
  .withMessage("Password is required")
  .isStrongPassword()
  .withMessage("Password minimum 8 characters and should include at least one lowercase letter, one uppercase letter, and one special character for enhanced security")
]

const validetionResult = function (req, res, next) {
  const erros = validationResult(req)
  const mappedError = erros.mapped();
  if (isEmpty(Object.keys(mappedError))) {
    next()
  } else {
    if(req.files){
      if (req.files.length > 0) {
      const {
        filename
      } = req.files[0]

      unlink(path.join(__dirname, `/../../public/uploads/avatars/${filename}`), (err) => {
        console.log(err)
      })
    }
    }
    
    res.status(200).json({error : mappedError})
  }
}

module.exports = {
  addUserValidetor,
  validetionResult
}
 