const {
  model
} = require('mongoose');
const peopleScema = require('../../model/pepole');
const Pepoles = new model("People", peopleScema)
const fs = require("fs")
const path = require("path");

const deleteUser = async (req, res, next) => {
  try {
    const getUser = await Pepoles.findOne({
      "_id": req.params.id
    });

    if (getUser._id) {
      const img = getUser.avatar;
      fs.unlink(path.join(__dirname, "../../public/uploads/avatars/", img), (err) => {
        next(err)
      });
      const deleteUser =  await Pepoles.deleteOne({ "_id": getUser._id  });
      if(deleteUser){
       res.status(200).json({
        msg: "User Successfully Deleted"
      })              
      }     
    } else {
      res.status(200).json({
        err: "User not Found"
      })
    }

  } catch (err) {
    console.log(err)
  }
}


module.exports = deleteUser