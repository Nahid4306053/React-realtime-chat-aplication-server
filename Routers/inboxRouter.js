const express = require('express')
const {goInbox} = require('../controller/inboxRouterController')
const inbox = express.Router();
const chekUser = require("../middlewares/common/chekUserdetails")
const {setConvertion} = require("../middlewares/inbox/addConverSion")
const {searchBuddy} = require("../middlewares/inbox/searchUser")
const {fileuploader , setMessageInDatabase} = require("../middlewares/inbox/getMessage")
const Meassges = require("../middlewares/inbox/Messages")
const UploadAttachment = require("../middlewares/inbox/UploadAttachment")
inbox.get('/', chekUser , goInbox  )
inbox.get('/message/:receverId', chekUser  , Meassges )
inbox.post('/', chekUser ,  searchBuddy )
inbox.post('/conversion', chekUser ,  setConvertion )
inbox.post('/message', chekUser , UploadAttachment , setMessageInDatabase )

// expoert the router 
module.exports  = inbox;         