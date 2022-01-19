const { Router } = require('express');
const { check } = require('express-validator');
const { checkFields, validateJwt } = require('../middlewares/');
const { categoryExist } = require('../helpers/db-validators');
const { createCategory, getCategories, getCategory } = require('../controllers/category');

const router = Router();

//Create category - open( just token )
router.post( '/' ,[
    validateJwt,
    check('name','You must provide a name').not().isEmpty(),
    checkFields
], createCategory );

//Retrieve all categories - open( just token )
router.get('/', [
    validateJwt
], getCategories )

//Retrive category - open ( just token )
router.get('/:id' ,[
    validateJwt,
    check( 'id', 'You must provide an id').not().isEmpty(),
    check( 'id', 'You must privide a valid id').isMongoId(),
    check( 'id' ).custom( categoryExist ),
    checkFields
], getCategory )

module.exports = router;