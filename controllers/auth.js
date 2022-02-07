const { response, request } = require("express");
const User                  = require('../models/user');
const { comparePwd }        = require('../helpers/password-encryption');
const { generateToken }     = require('../helpers/jwt')

//Login
const login = async( req , res  = response ) => {

    const { email, password } = req.body;

    const userTemp = await User.findOne( { email } );

    //user existence
    if ( !userTemp ) {
        return res.status( 400 ).json({
            msg : `An user with the email ${ email } doesn't exist`    
        })
    }

    //user is active
    if ( userTemp.status != 'ACTIVE' ){
        return res.status( 400 ).json({
            msg : `The user with the email ${ email } isn't active, please contact to your admin`    
        })
    }

    //checks password
    if ( !comparePwd( password, userTemp.password ) ){
        return res.status( 400 ).json({
            msg : `Incorrect password, please try again`    
        })
    }

    //token
    const token = await generateToken( userTemp._id );

    res.status( 200 ).json({
        userTemp,
        token
    })

}


module.exports = {
    login
}