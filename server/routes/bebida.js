const express = require('express');
const router = express.Router();
const bebida = require('../modules/carta/bebida');

router.post('/nuevaBebida/:nombre/:precio',bebida.bebida_insert);
router.post('/borrarBebida/:nombre',bebida.bebida_delete);


module.exports=router;