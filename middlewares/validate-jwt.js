const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const validateJwt = async( req = request , res = response, next ) => {

    const token = req.header('token');

    if (!token){
        return res.status( 401 ).json({
            msg : `There's no token in the request`
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETKEY );

        const userTmp = await User.findById( uid );
    
        if ( !userTmp ){
            return res.status( 401 ).json({
                msg : `Invalid token, user doesn't exist`
            })
        }

        if ( userTmp.status != 'ACTIVE' ){
            return res.status( 401 ).json({
                msg : `The user isn't active, contact to your administrator`
            })
        }

        next();
        
    } catch (error) {
        console.log( error );
        return res.status( 500 ).json({
            msg : 'An error has ocurred, contact to your administrator'
        });
    };

}

module.exports = {
    validateJwt
};