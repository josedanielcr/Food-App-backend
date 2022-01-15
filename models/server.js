const express    = require('express');
var cors         = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer( this.app );

        //rutas
        this.routes  = {
            user : '/api/user',
            auth : '/api/auth'
        }

        this.conectarDB();
        this.middlewares();
        this.route();

    }


    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static( 'public' ) );
        this.app.use(fileUpload( { 
            useTempFiles     : true, 
            tempFileDir      : '/tmp/',
            createParentPath : true } )
        );

    }

    route() {
        this.app.use(this.routes.user, require('../routes/user.routes'));
        this.app.use(this.routes.auth, require('../routes/auth.routes'));
    }

    listen(){
        this.server.listen( this.port , () => {
            console.log( 'Server running at port: ', this.port );
        });
    }

}

module.exports = Server;