const category = require('../models/category');

const categoryExist = async( id = '' ) => {

    const categoryTmp = await category.findById( id );

    if ( !categoryTmp ){
        throw new Error(`The category doesn't exist`);
    }
    
}



module.exports = {
    categoryExist
}