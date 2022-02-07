const checkFields = require('../middlewares/check-fields');
const validateJwt = require('../middlewares/validate-jwt');
const isAdminRole = require('../middlewares/roles-validators');

module.exports ={
    ...checkFields,
    ...validateJwt,
    ...isAdminRole
};