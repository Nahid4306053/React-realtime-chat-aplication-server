const {
  model
} = require('mongoose');
const convertionModel = require('../model/Convertion.');
const peopleScema = require('../model/pepole');
const messageModel = require('../model/messegeModel');
const Pepoles = new model("People", peopleScema)
const Convertions = new model("Convertion", convertionModel);
const meassges = new model("meassge",messageModel)
const goInbox = async (req, res, next) => {
try{
  const AsCreator = await Convertions.find({"creator._id":req.currentUser._id}).select(" _id participate createdAt")
  const Asparticipate = await Convertions.find({"participate._id":req.currentUser._id}).select(" _id creator createdAt")
  const converobj = [...AsCreator , ...Asparticipate]; 
   if(converobj.length > 0){   
     const strinData = JSON.stringify(converobj);
     const dataforClient = async (readydata) =>{
      let Clientdata = []
      for(let Convertion of readydata){
          const getMessages = await meassges.findOne({
            $or: [{
              "sender._id": Convertion.participate._id,
              "recever._id": req.currentUser._id.toString()
            },
            {
              "sender._id": req.currentUser._id.toString(),
              "recever._id": Convertion.participate._id
            }
          ]
        }).select("-_id message updatedAt").sort({last_update: -1}).limit(1)
        Convertion.participate.lastmeassage = getMessages?.message;
        Convertion.participate.lastmeassagedate = getMessages?.updatedAt;
        Clientdata.push(Convertion)
      }
      return Clientdata
     }
     let finaldata = [];
      if(strinData.includes('"creator":')){
        const regEx = /"creator":/g;
        finaldata = JSON.parse(strinData.replace(regEx, '"participate":'));

      }
      else{ 
        finaldata = converobj;  
      } 
         
      const readyData = await dataforClient(finaldata);
      res.status(200).json({conversions:readyData})
       
   } 
   
}catch(err){
        next(err)
   }
 
}

module.exports = {
   goInbox
}
