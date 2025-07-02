import multer from "multer"
let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null, "./public/")
    },
    filename:(req,file,callback)=>{
        callback(null, file.originalname)
    }
})

const upload = multer({storage})

export default upload