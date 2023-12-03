const path = require('path')
const errort = require('http-errors');
const {
  model
} = require('mongoose');
const Peoplescema = require("../../model/pepole");
const messageScema = require("../../model/messegeModel")
const ConvertionsScema = require("../../model/Convertion.")
const {
  isEmpty
} = require('lodash');
const Pepoles = new model("People", Peoplescema);
const sendMeassge = new model("Meassge", messageScema);
const Convertion = new model("convertions", ConvertionsScema);

function fileuploader(subfolder, minetypes, limits, errmsg) {
  const multer = require('multer');
  const uploadDrection = `${__dirname}/../../public/uploads/${subfolder}`
  const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, uploadDrection)
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const filename = file.originalname.replace(fileExt, '').replace(/\s+/g, ' ')
        .split(' ').join("_") + Date.now() + fileExt;
      cb(null, filename)
    }
  })

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: limits,
      files: 2
    },
    fileFilter: (req, file, cb) => {
      if (minetypes.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(errmsg, false);
      }
    }
  })
  return upload;
}

const setMessageInDatabase = async (req, res) => {
  try {
    if (req.body.recever) {
      const matchedConvertion = await Convertion.findOne({
        $or: [{
            $and: [{
                "creator._id": req.body.recever
              },
              {
                "participate._id": req.currentUser._id.toString()
              }
            ]
          },
          {
            $and: [{
                "creator._id": req.currentUser._id.toString()
              },
              {
                "participate._id": req.body.recever
              }
            ]
          }
        ]
      }).select(" _id ");
      const findParticipate = await Pepoles.findOne({
        "_id": req.body.recever
      }).select("name , avatar")
      if (!isEmpty(matchedConvertion)) {


        let dataForsaveinDatabase;
        if (!isEmpty(req.files)) {
          const attachments = req.files.map((ele) => {
            return ele.filename;
          })
          dataForsaveinDatabase = {
            message: req.body.message,
            attachments: attachments,
            sender: req.currentUser,
            recever: findParticipate
          }

        } else {
          dataForsaveinDatabase = {
            message: req.body.message,
            sender: req.currentUser,
            recever: findParticipate
          }
        }
        const newmaessage = await sendMeassge(dataForsaveinDatabase);
        const saveMessage = await newmaessage.save();
        if (!isEmpty(saveMessage)) {
          res.status(200).json({
            msg: "Send Successfully"
          })
          global.io.emit("new_message", {
            ConvertionID: matchedConvertion._id.toString(),
            message: saveMessage
          })

        } else {
          res.status(200).json({
            error: "There is a server side error"
          })
        }

      } else {
        res.status(200).json({
          error: "Recever not found"
        })
      }
    } else {
      res.status(200).json({
        error: "Without recever you can't send data"
      })
    }
  } catch (err) {
    res.status(500).json({
      error: "There is server side errror"
    })
    console.log(err);
  }

}
module.exports = {
  fileuploader,
  setMessageInDatabase
};
