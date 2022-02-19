var cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );


const uploadFile = async ( file = '', folder = {} ) => {

    if( !file ){
        return;
    }

    const { secure_url } = await cloudinary.uploader.upload( file, folder);
    return secure_url;
}





module.exports = {
    uploadFile
}