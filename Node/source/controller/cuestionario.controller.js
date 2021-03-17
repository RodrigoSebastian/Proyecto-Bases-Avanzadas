const db = require('../database/database');

module.exports.AgregarCuestionario = (req, res, next) => {
    let cuestionario = req.body;
    let sql = 'CALL Guardar_Cuestionario(?)';
    db.query(sql,[JSON.stringify(cuestionario)],(error,results,fields) => {  // NOTA IMPORTANTE JSON.stringify(cuestionario) SI QUIERO MANDAR UN JSON
        if(error)
            res.send(error);
        res.json(results);
    });
}

module.exports.VerificarUsuario = (req, res, next) => {
    let sql = 'CALL Checar_Usuario(?)';
    db.query(sql,[req.params.userD],(error,results,fields) => {  // NOTA IMPORTANTE JSON.stringify(cuestionario) SI QUIERO MANDAR UN JSON
        if(error)
            res.send(error);
        res.json(results);
    });
}

module.exports.SelectCuestionario = (req, res, next) => {
    let sql = 'SELECT * FROM cuestionario';
    db.query(sql,(error,results,fields) => {
        if(error)
            res.send(error);
        res.json(results);
    });
}