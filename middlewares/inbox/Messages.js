const Peoplescema = require("../../model/pepole");
const messageScema = require("../../model/messegeModel")
const {
  isEmpty
} = require('lodash');
const {
  model
} = require("mongoose");
const Pepoles = new model("People", Peoplescema);
const Meassges = new model("Meassge", messageScema);
const clientMessages = async (req, res) => {
  try {
    if (req.params.receverId) {
      const getMessages = await Meassges.find({
        $or: [
          {
            $and: [{
                "sender._id": req.params.receverId
              },
              {
                "recever._id": req.currentUser._id.toString()
              }
            ]
          },
          {
            $and: [{
                "sender._id": req.currentUser._id.toString()
              },
              {
                "recever._id": req.params.receverId
              }
            ]
          }
        ]
      }).select("recever sender message attachments last_update").sort({last_update: 1})

      res.status(200).json({
        data: getMessages
      })
    } else {
      res.status(200).json({
        error: "Recever id not send"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: "There is Server Side"
    })
  }
}

module.exports = clientMessages;
