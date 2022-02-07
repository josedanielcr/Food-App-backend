const { Schema , model } = require('mongoose');


const MenuOptionSchema = new Schema({
    name : {
        type     : String,
        unique   : true,
        required : [ true, 'The name must be provided']
    },
    icon : {
        type     : String,
        default  : 'ACTIVE',
        required : true
    },
    status : {
        type     : Boolean,
        default  : true,
        required : false
    },
    role : {
        type: [String],
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    path : {
        type : String,
        required : true
    }
});

MenuOptionSchema.methods.toJSON = function(){
    const { __v ,status,role,...menu } = this.toObject();
    return menu;
}

module.exports = model( 'MenuOption' , MenuOptionSchema );