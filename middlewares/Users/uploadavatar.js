const fileuploader = require('../../Utils/fileuploader')

function avatarUploader(req, res, next) {
  const upload = fileuploader('avatars', ['image/jpg', 'image/png', 'image/jpeg', 'image/webp', ], 1000000, "Only jpg png jpeg and webp file are allowed for Profile")

  // call middleware
  upload.any()(req , res , (err)=>{
   if(err){
     res.status(200).json({
       error : {
        avatar:{
          msg : err
        }
       }
     })
   }
   else{
    next()
   }
  })
}
 
module.exports = avatarUploader;
