const { Schema , model } = require('mongoose');


const CategorySchema = new Schema({
    name : {
        type     : String,
        unique   : true,
        required : [ true, 'The category must be provided']
    },
    status : {
        type     : String,
        default  : 'ACTIVE',
        required : true
    },
    image : {
        type     : String,
        default  : '',
        required : true
    }
});

CategorySchema.methods.toJSON = function(){
    const { __v,...category } = this.toObject();
    return category;
}

module.exports = model( 'Category' , CategorySchema );