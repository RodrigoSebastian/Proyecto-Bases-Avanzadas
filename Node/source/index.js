const cuestionarioRoute = require('./routes/cuestionario.route');

// OBLIGATORIO -_-

    //** Requires ***/
    const express = require('express');
    const morgan = require('morgan');
    const cors = require('cors');
    const path = require('path');

    //** Servidor ***/
    const app = express();

    //Puerto del servidor
    app.set('port', process.env.PORT || 3000);

    //** Middlewares ***/

    //Log de peticiones por consola
    app.use(morgan('dev'));

    //Enviar y recibir jsons
    app.use(express.json());

    //Aceptar datos de formularios
    app.use(express.urlencoded({extended: true}));

    //CORS
    app.use(cors());
    // Configurar cabeceras y cors
    // app.use((req,res, next)=>{
    //     res.header('Access-Control-Allow-Origin', '*');
    // })

    app.use('/cuestionario',cuestionarioRoute);

    //** Starting the server ***/
    app.listen(app.get('port'), () => {
        console.log('Server on port ', app.get('port'));
        console.log('Key token: ' + app.get('llavetoken'));
    });

// OBLIGATORIO -_-










// Diego Montoya estuvo aquí