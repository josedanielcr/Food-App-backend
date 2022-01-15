const { Router } = require('express');
const { check } = require('express-validator');
const { checkFields } = require('../middlewares/index');
const { login } = require('../controllers/auth');

const router = Router();

//Login
router.post('/login',[
    check( 'email' , 'You must provide en email').isEmail(),
    check( 'password' , 'You must provide a passaword').not().isEmpty(),
    checkFields
] , login );

module.exports = router;