const { Router } = require('express');
const { check } = require('express-validator');
const { checkFields, validateJwt, isAdminRole } = require('../middlewares/');
const { categoryExist } = require('../helpers/db-validators');
const { 
    createCategory, 
    getCategories,
    getCategory, 
    updateCategory,
    deleteCategory
    } = require('../controllers/category');

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
], getCategories );

//Retrive category - open ( just token )
router.get('/:id' ,[
    validateJwt,
    check( 'id', 'You must provide an id').not().isEmpty(),
    check( 'id', 'You must privide a valid id').isMongoId(),
    check( 'id' ).custom( categoryExist ),
    checkFields
], getCategory );

//Update category - private just admin
router.put('/:id' , [
    validateJwt,
    isAdminRole,
    check( 'id', 'You must provide an id').not().isEmpty(),
    check( 'id', 'You must privide a valid id').isMongoId(),
    check( 'id' ).custom( categoryExist ),
    checkFields
], updateCategory );

//delete category - private just admin
router.delete('/:id', [
    validateJwt,
    isAdminRole,
    check( 'id', 'You must provide an id').not().isEmpty(),
    check( 'id', 'You must privide a valid id').isMongoId(),
    checkFields
], deleteCategory);

module.exports = router;