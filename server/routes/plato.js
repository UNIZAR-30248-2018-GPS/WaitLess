const express = require('express');
const router = express.Router();
const plato = require('../modules/carta/plato');

router.post('/nuevoPlato',plato.plato_insert);
router.post('/modificarPlato/:nuevonombre/:descripcion/:precio/:tipo/:disponible/:id',plato.plato_modificar);
router.post('/borrarPlato/:id',plato.plato_delete);
router.get('/alergenos/:id',plato.plato_alergenos);
router.get('/ingredientes/:id',plato.plato_ingredientes);
router.get('/getAllIngredientes/',plato.getAllIngredientes);
router.get('/getAllAlergenos/',plato.getAllAlergenos);
router.post('/borrarDisponibilidad/:id_plato',plato.plato_nodisponible)
router.post('/darDisponibilidad/:id_plato',plato.plato_disponible)
router.post('/anadir_despensa/:nombre',plato.anadir_despensa)




module.exports=router;