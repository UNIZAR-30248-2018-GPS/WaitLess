const express = require('express');
const router = express.Router();
const plato = require('../modules/carta/plato');

router.post('/nuevoPlato/:nombre/:descripcion/:precio/:tipo',plato.plato_insert);
router.post('/modificarPlato/:nuevonombre/:descripcion/:precio/:tipo/:id',plato.plato_modificar);
router.post('/borrarPlato/:nombre',plato.plato_delete);


module.exports=router;