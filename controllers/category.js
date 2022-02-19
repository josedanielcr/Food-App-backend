const { request, response } = require("express");
const Category              = require('../models/category');
const fileUpload            = require('../helpers/file-upload');

const createCategory = async ( req = request , res = response ) => {

   const { name } = req.body;
   const image = req.files || null;
   let imageUrl;

   const categoryTemp = await Category.findOne( { name } );

   if ( categoryTemp ) {
       return res.status( 400 ).json({
           msg : `The category with the name ${ name } already exist`
       })
   }

   if( image ){
       imageUrl = await fileUpload.uploadFile( image.image.tempFilePath, { folder : 'FoodApp/FoodCategories'} );
   } else {
    return res.status( 400 ).json({
        msg : `The category must have an image`
    })
   }

   const data = {
       name,
       image : imageUrl
   }

   const newCategory = new Category( data );
   await newCategory.save();

  return res.status( 200 ).json( newCategory );

}

const getCategories = async ( req = request , res = response ) => {

    const query = { status : 'ACTIVE' };

    const categories  = await Category.find( query )

    return res.status( 200 ).json( categories );

}

const getCategory = async ( req = request , res = response ) => {

    const { id } = req.params;

    const categoryTmp = await Category.findById( id );

    return res.status( 200 ).json({
        category : categoryTmp
    });

}



const updateCategory = async( req = request , res = response ) => {

    const { id }  = req.params;
    const { name, status } = req.body;
    const image = req.files || null;
    let imageUrl;

    try {

        const previousCategory = await Category.findById( id );

        if( !previousCategory ) {
            return res.status( 400 ).json( {
                msg : `The given category doesn't exist`
            } );
        }

        if( image ){
            imageUrl = await fileUpload.uploadFile( image.image.tempFilePath, { folder : 'FoodApp/FoodCategories'} );
        } else {
            imageUrl = previousCategory.image;
        }

        const data = {
            name,
            image : imageUrl,
            status
        }

        const newCategory = await Category.findOneAndUpdate( { _id : id } , data, { new : true } );

        return res.status( 200 ).json( newCategory );
    }  
    catch( err ){
        return res.status( 500 ).json({
            msg : `An error has ocurred during the update, please try again or contact to your administrator`
        })
    }
    
}

const deleteCategory = async( req = request , res = response ) => {

    const { id } = req.params;
    console.log( id );
    try {

        const deletedCategory = await Category.findByIdAndUpdate( id , { status : 'INACTIVE' },  { new : true });

        res.status( 200 ).json( deletedCategory );
    
    } catch (error) {
        res.status( 500 ).json( {
            msg : `An error has ocurred during the update, please try again or contact to your administrator`
        } )
    }
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}