const checkFields = require('../middlewares/check-fields');
const validateJwt = require('../middlewares/validate-jwt');

module.exports ={
    ...checkFields,
    ...validateJwt
};