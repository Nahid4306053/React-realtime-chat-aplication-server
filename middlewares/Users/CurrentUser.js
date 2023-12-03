function CurrentUser(req,res) {
 res.status(200).json({data:req.currentUser})
} 
module.exports = CurrentUser 
