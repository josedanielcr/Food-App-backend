const { Router }     = require('express');
const { check }      = require('express-validator');
const { checkFields, validateJwt, isAdminRole } = require('../middlewares/index');
const { getMenuOptions, createMenuOption }     = require('../controllers/menuOption');

const router = Router();

//create an option
router.post('/',[
    validateJwt,
    isAdminRole,
    check( 'name' , 'You must provide a name').not().isEmpty(),
    check( 'role' , 'You must provide a role').not().isEmpty(),
    check( 'icon' , 'You must provide an icon').not().isEmpty(),
    check( 'path' , 'You must provide a path').not().isEmpty(),
    checkFields
], createMenuOption );

//get menu options by role
router.get('/',[
    validateJwt,
    checkFields,
], getMenuOptions )

module.exports = router;