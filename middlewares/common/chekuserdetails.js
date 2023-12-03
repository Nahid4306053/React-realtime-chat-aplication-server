const { verify } = require("jsonwebtoken");
const peopleScema = require('../../model/pepole');
const { model } = require("mongoose");
const { isEmpty } = require("lodash");
const Pepoles = new model("People", peopleScema)
const chekUser = async (req, res, next) => {
  try {  
    const token = req.signedCookies[process.env.COOKIE_NAME]
    if(token){
      const data = verify(token, process.env.SECRETKEY_KEY_F_JWT)
      if (data.mobile) {
        const matchUser = await Pepoles.findOne({
          mobile: data.mobile
        }).select("_id name avatar email mobile role")
        if (!isEmpty(matchUser)) {
          req.currentUser = matchUser;             
          next()
        } else {
          res.status(200).json({error:"User not found"})
        }
      } else {
        res.status(200).json({error:"User not found"})
      }
    }
    else{
      res.status(404).json({error:"User not found"})
    }

  } catch (err) {
    res.status(404).json({error:"User not found"})
  }
}

module.exports = chekUser;
