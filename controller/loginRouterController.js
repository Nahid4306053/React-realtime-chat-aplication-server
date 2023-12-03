const { model } = require('mongoose');
const peopleScema = require('../model/pepole');
const { isEmpty } = require('lodash');
const { compareSync } = require('bcryptjs');
const { sign ,verify } = require('jsonwebtoken');
const Pepoles = new model("People",peopleScema)


const chekUser = async (req ,res ,next)=>{
   try{
      const { identy, password } = req.body;
      const getuser = await Pepoles.findOne({$or:[{email:identy},{mobile:identy}]});
      if(isEmpty(getuser)){
         res.status(200).json({error:{
            user:{
               msg:"User Not Found"
            }
         }})
      }
      else{
        const matchPasword = compareSync(password,getuser.password)
        if(matchPasword){
         const data = {
            "_id" : getuser._id,
            name : getuser.name,
            email : getuser.email,
            mobile : getuser.mobile,
            role : getuser.role,
         }
          const token = sign(data, process.env.SECRETKEY_KEY_F_JWT,{
            expiresIn : process.env.EXPIRE_TIME,
          })

         //  set cookies

          res.cookie(process.env.COOKIE_NAME,token,{
            maxAge:process.env.EXPIRE_TIME,
            signed: true,
            httpOnly: true
          })

         res.status(200).json({success:{
            data: data
         }})    
        }   
        else{
         res.status(200).json({error:{
            user:{
               msg:"Wrong Password"
            }
         }})
        }
      }
   }
   catch(err){
   console.log(err)
   }
}


 


module.exports = {  chekUser  }