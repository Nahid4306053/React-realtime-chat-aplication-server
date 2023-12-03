const CheakUserRole = (req,res,next) =>{
   if(req.currentUser.role === 'admin'){
      next();
   }
   else{
      res.status(200).json({error:"UnAthorized user"})              
   }
}
module.exports = CheakUserRole; 