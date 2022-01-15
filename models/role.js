const { Schema , model } = require('mongoose');

const RoleSchema = Schema({
    rol : {
        type: String,
        required : [ true , 'the role must be provided' ]
    }
});

module.exports = model( 'Role' , RoleSchema );