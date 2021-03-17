const express = require('express');
const router = express.Router();
const cuestionarioController = require('../controller/cuestionario.controller');

router.post('/',cuestionarioController.AgregarCuestionario);
router.get('/',cuestionarioController.SelectCuestionario);
router.get('/user/:userD',cuestionarioController.VerificarUsuario);

module.exports = router;