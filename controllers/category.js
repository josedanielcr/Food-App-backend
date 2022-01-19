const { request, response } = require("express");
const Category              = require('../models/category');

const createCategory = async ( req = request , res = response ) => {

   const { name } = req.body

   const categoryTemp = await Category.findOne( { name } );

   if ( categoryTemp ) {
       return res.status( 400 ).json({
           msg : `The category with the name ${ name } already exist`
       })
   }

   const data = {
       name
   }

   const newCategory = new Category( data );
   await newCategory.save();

   return res.status( 200 ).json( newCategory );

}

const getCategories = async ( req = request , res = response ) => {

    const query = { status : 'ACTIVE' };

    const [ total , categories ] = await Promise.all([
        Category.countDocuments( query ),
        Category.find( query )
    ]);

    return res.status( 200 ).json({
        total,
        categories
    });

}

const getCategory = async ( req = request , res = response ) => {

    const { id } = req.params;

    const categoryTmp = await Category.findById( id );

    return res.status( 200 ).json({
        category : categoryTmp
    });

}

module.exports = {
    createCategory,
    getCategories,
    getCategory
}