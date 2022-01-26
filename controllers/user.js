const { request, response } = require("express");
const User                  = require('../models/user');
const { encryptPwd }        = require('../helpers/password-encryption');


const signUp = async ( req = request , res = response ) => {

    const {name, email } = req.body; 
    
    const userDB = await User.findOne( { email } );
    if ( userDB ){
        return res.status( 400 ).json({
            msg: `There's already an user with the email ${ userDB.email }`
        });
    }

    const data = {
        name,
        email,
        password : encryptPwd(req.body.password),
        image : ''
    }

    const newUser = new User( data );
    await newUser.save();

    res.status( 200 ).json(  newUser );
}

module.exports = {
    signUp
}