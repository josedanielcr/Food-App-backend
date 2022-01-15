const bcrypt = require('bcryptjs');

const encryptPwd = ( password ) => {

    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync( password, salt );

}


const comparePwd = ( pwdTarget, hash ) => {
    return bcrypt.compareSync( pwdTarget, hash ); 
}


module.exports = {
    encryptPwd,
    comparePwd
}