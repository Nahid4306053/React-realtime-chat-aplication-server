const {
  model
} = require('mongoose');
const peopleScema = require('../../model/pepole');
const {
  isEmpty
} = require('lodash');
const Pepoles = new model("People", peopleScema)

const searchBuddy = async (req, res, next) => {
  if (req.body.keyword) {
    const getuser = await Pepoles.find({
      $or: [
        { 
          name: new RegExp(req.body.keyword, 'i') 
        },
        {
          email: new RegExp(req.body.keyword, 'i')
        },
        {
          mobile: new RegExp(req.body.keyword, 'i')
        }
      ] 
    }).select("name avatar").limit(5)
    if (!isEmpty(getuser)) {
      res.status(200).json({
        data: getuser
      })
    } else {
      res.status(200).json({
        error: "Not Found"
      })
    }

  }
}



module.exports = {
  searchBuddy
}
