const {
  model
} = require('mongoose');
const peopleScema = require('../../model/pepole');
const convertionModel = require('../../model/Convertion.');
const {
  isEmpty
} = require('lodash');
const Pepoles = new model("People", peopleScema)
const Convertions = new model("Convertion", convertionModel)

const setConvertion = async (req, res, next) => {
  try{
    if(req.currentUser._id.toString() !== req.body.participate_id){
      if (req.currentUser._id && req.body.participate_id) { 
        const getuser = await Pepoles.findOne({"_id":req.currentUser._id}).select(" name avatar")
        const getparticipate = await Pepoles.findOne({"_id":req.body.participate_id}).select("name avatar");
        if (!isEmpty(getuser) && !isEmpty(getparticipate)) { 
           const cheackConvertion = await Convertions.findOne({
            $or:[
              {
               $and:[
                {"creator._id": req.currentUser._id},
                {"participate._id":req.body.participate_id},
               ]
              }, 
              {
               $and:[
                {"creator._id": req.body.participate_id},
                {"participate._id":req.currentUser._id},
               ]
              },
            ]
           })  
            if(isEmpty(cheackConvertion)){
              const saveConvertion = await Convertions({creator:getuser , participate: getparticipate})
              const save = await saveConvertion.save()
              if(save){
                res.status(200).json({success:true})
              }  
              else{
                res.status(200).json({
                  error: "There Is Server Side Error"
                })
              } 
            }
            else{
              res.status(200).json({
                error: "Already Created Convertion"
              })
            }
        } else {
          res.status(200).json({
            error: "Not Found"
          })
       }     
    } 
  else{
    res.status(200).json({
      error: "Request Not Found"
    })
  }
    }
    else{
        res.status(200).json({ 
          error: "You can't create convertion with you"
      })
    } 
  } 
  catch(err){
    console.log(err)
    res.status(200).json({ 
      error: "Server Side Eror"
  })
  }
}



module.exports = {
  setConvertion
}
