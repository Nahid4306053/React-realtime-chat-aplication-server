const { check, validationResult } = require("express-validator");
const { isEmpty } = require("lodash");

const logindatavalidetion = [
check('identy')
.isLength({min:1})
.withMessage("Give me your mobile number otherwise Email")
,
check('password')
.isLength({min:1})
.withMessage("Password Requried")
]

const getvalidetionResult = function(req ,  res , next){
  const erors = validationResult(req)
  const mappedErorr = erors.mapped();
  if(isEmpty(mappedErorr)){
      next()              
  }
  else{
   res.status(200).json({error:mappedErorr})           
  }
}

module.exports = {logindatavalidetion , getvalidetionResult}

