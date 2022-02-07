const Category = require('../models/category');
const Role = require('../models/role');

const categoryExist = async( id = '' ) => {

    const categoryTmp = await Category.findById( id );

    if ( !categoryTmp ){
        throw new Error(`The category doesn't exist`);
    }
    
}

const roleExists = async( name = '' ) => {

    const roleTemp = await Role.findOne( { name } );

    if ( !roleTemp ){
        throw new Error(`The role doesn't exist`);
    }
    
}



module.exports = {
    categoryExist,
    roleExists
}