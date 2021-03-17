const mysql = require('mysql');
const config = require('./config');
const conexion = mysql.createConnection(config);

module.exports = conexion;