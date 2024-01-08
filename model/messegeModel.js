const { Schema } = require("mongoose");


const messageModel = Schema({
    message : {
       type:String 
    },  
    attachments : {
      type:String 
    },               
    sender:{
      _id: String,
      name:String,
      avatar: String
    },     
    recever:{
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

module.exports = messageModel