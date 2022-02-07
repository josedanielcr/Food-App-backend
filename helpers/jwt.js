const jwt = require('jsonwebtoken');


const generateToken = async( uid ) => {

    return new Promise ( ( resolve , reject ) => {

        const payload = { uid };

        jwt.sign( payload , process.env.SECRETKEY , {
            expiresIn: '1h'
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

const getUidWithToken = async( token ) => {

    try {

        const { uid } = jwt.verify( token, process.env.SECRETKEY ); 
        return uid;
    } catch (error) {
        throw new Error("Invalid token");
    }
}



module.exports = {
    generateToken,
    getUidWithToken
}