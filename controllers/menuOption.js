const { request, response } = require("express");
const MenuOption            = require('../models/menuOption');



const createMenuOption = async ( req = request , res = response ) => {

    const { name, icon, role, path } = req.body;

    const tmpMenuOption = await MenuOption.findOne( { name } );

    if( tmpMenuOption ){
        return res.status( 400 ).json({
            msg : `the menu option with the name ${ name } already exists`
        })
    }

    const data = {
        name,
        icon,
        role,
        path
    }

    const newMenuOption = new MenuOption( data );
    await newMenuOption.save();
    
    return res.status( 200 ).json( newMenuOption );
}


const getMenuOptions = async ( req = request , res = response ) => {

   const { role } = req.user;

   try {

    const menuOptions = await MenuOption.find({ role });
    
    if( !menuOptions ){
        return res.status( 400 ).json({
            msg : `there are no menu options with the role ${ role }`
        })
    }

    return res.status( 200 ).json( menuOptions );

   } catch (error) {
    return res.status( 400 ).json({
        msg : `An error has occurred, please contant your administrator`
    })
   }
   
}



module.exports = {
    createMenuOption,
    getMenuOptions
}