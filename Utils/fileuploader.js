const path = require('path')
const errort = require('http-errors');
function fileuploader(subfolder, minetypes , limits , errmsg){
const multer = require('multer');
const uploadDrection =  `${__dirname}/../public/uploads/${subfolder}` 
const storage = multer.diskStorage({
   destination:  (req,res,cb)=>{
       cb(null,uploadDrection)
   },
   filename : (req , file , cb)=>{
      const fileExt = path.extname(file.originalname);
      const filename = file.originalname.replace(fileExt,'').replace(/\s+/g, ' ')
      .split(' ').join("_") + Date.now() + fileExt; 
      cb(null , filename)          
   }                
})

const upload = multer({
  storage : storage,
  limits : limits,
  fileFilter : (req , file , cb)=>{
     if(minetypes.includes(file.mimetype)){
        cb(null , true)            
     }
     else{
       cb(errmsg , false);              
     }
  }                   
})
return upload ;
                  
}


module.exports = fileuploader;