
const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: [ true, 'The name is required' ]
    },
    email: {
        type: String,
        required: [ true, 'The email is required' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'The password is required' ]
    },
    image: {
        type: String,
        default : ''
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: String,
        default: 'ACTIVE'
    }
});


UserSchema.methods.toJSON = function(){
    const { __v , password, _id ,...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema );