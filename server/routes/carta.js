const express = require('express');
const router = express.Router();
const carta = require('../modules/carta/carta');

router.get('/',carta.carta_get);

module.exports=router;