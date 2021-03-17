const cuestionarioRoute = require('./routes/cuestionario.route');

// OBLIGATORIO -_-

    //** Requires ***/
    const express = require('express');
    const morgan = require('morgan');
    const cors = require('cors');
    const path = require('path');
    const bodyParser = require("body-parser");

    //** Servidor ***/
    const app = express();

    //Puerto del servidor
    app.set('port', process.env.PORT || 3000);

    //** Middlewares ***/

    //Log de peticiones por consola
    app.use(morgan('dev'));

    //Enviar y recibir jsons
    app.use(bodyParser.json());

    //Aceptar datos de formularios
    app.use(bodyParser.urlencoded({extended: true}));


    //** Starting the server ***/
    app.listen(app.get('port'), () => {
        console.log('Server on port ', app.get('port'));
        console.log('Key token: ' + app.get('llavetoken'));
    });

// OBLIGATORIO -_-


app.use('/cuestionario',cuestionarioRoute);


    //CORS
    app.use(cors());
    // Configurar cabeceras y cors