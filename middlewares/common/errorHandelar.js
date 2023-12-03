const createError = require('http-errors');

//404 not found
const notFoundehandeler = (err,req,res,next)=>{
  next(createError(404,"Your requsted content was not found"))
}

// defult err

const errorHandeler = (err,req,res,next)=>{
    res.status(200).json({
      msg:"There is a server side error ocurred", 
      details : err.message           
   })                  
}

module.exports = {notFoundehandeler , errorHandeler}