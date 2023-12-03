const { Schema } = require("mongoose");


const convertionModel = Schema({
    creator:{
      _id: String,
      name:String,
      avatar: String
    },     
     participate:{
      _id: String,
      name:String,
      avatar: String
    } ,
    last_update:{
       type:Date,
       default: Date.now
    }
},{
   timestamps:true                 
})

module.exports = convertionModel