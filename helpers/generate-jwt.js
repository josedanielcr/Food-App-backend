const jwt = require('jsonwebtoken');


const generateToken = async( uid ) => {

    return new Promise ( ( resolve , reject ) => {

        const payload = { uid };

        jwt.sign( payload , process.env.SECRETKEY , {
            expiresIn: '10m'
        }, ( err, token) => {
            if( err ) {
                console.log( err );
                reject( 'No se pudo generar el JWT')
            } else{
                resolve( token );
            }
        });
    });

}


module.exports = {
    generateToken
}