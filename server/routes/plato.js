const express = require('express');
const router = express.Router();
const plato = require('../modules/carta/plato');

router.post('/nuevoPlato/:nombre/:descripcion/:precio/:tipo',plato.plato_insert);
router.post('/modificarPlato/:nuevonombre/:descripcion/:precio/:tipo/:disponible/:id',plato.plato_modificar);
router.post('/borrarPlato/:nombre',plato.plato_delete);
router.get('/alergenos/:id',plato.plato_alergenos);
router.get('/ingredientes/:id',plato.plato_ingredientes);
router.post('/borrarDisponibilidad/:id_plato',plato.plato_nodisponible)
router.post('/darDisponibilidad/:id_plato',plato.plato_disponible)




module.exports=router;