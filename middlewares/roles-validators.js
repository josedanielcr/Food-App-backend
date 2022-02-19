const { request, response } = require("express")

const isAdminRole = ( req = request , res = response , next ) => {
    
    if ( !req.user ){
        return res.status(500).json({
            msg: `it's necessary to validate the token before the role`
        })
    }

    const { role , name } = req.user;

    if ( role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${ name } it's not an administrator`
        })
    }

    next();

}


module.exports = {
    isAdminRole
}