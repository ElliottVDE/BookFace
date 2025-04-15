import multer from 'multer';
import gridfsStorage from  'multer-gridfs-storage';


const storage = new gridfsStorage({
    url: process.env.DB,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req,file)=> {
        const match = ["image/png", "image/jpeg"];

        if(match.indexOf(file.mimetype) === -1){
            const filename = '${Date.now()}-any-name-${file.originalname}';
            return filename;
        }

        return {
            bucketName: "photos",
            filename: '${Date.now()}-any-name-${file.orignialname'
        }
    }
})

module.exports = multer({storage});