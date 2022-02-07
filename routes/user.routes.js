const { Router }     = require('express');
const { check }      = require('express-validator');
const { checkFields, validateJwt } = require('../middlewares/index');
const { signUp, getUserByToken }     = require('../controllers/user');

const router = Router();

//SignUp
router.post('/signUp',[
    check( 'name'    , 'You must provide a name').not().isEmpty(),
    check( 'email'   , 'You must provide a email').not().isEmpty().isEmail(),
    check( 'password', 'You must provide a password').not().isEmpty(),
    checkFields
], signUp);

module.exports = router;