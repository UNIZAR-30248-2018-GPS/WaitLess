const bd = require('../../database/querys');

const plato_insert = function (req,res) {
    let data = [
        req.params.nombre,
        req.params.precio,
        req.params.tipo,
        req.params.descripcion,
        true
    ];
    bd.plato_insert(data, res);
};

const plato_modificar = function (req,res) {
    let data = [
        req.params.nuevonombre,
        req.params.precio,
        req.params.tipo,
        req.params.descripcion,
        req.params.disponible,
        req.params.id
    ];
    bd.plato_modify(data, res);
};
const plato_delete = function (req,res) {
    let data = [
        req.params.nombre
    ] 
    bd.plato_delete(data, res);
};

const plato_alergenos = function (req,res) {
    let data = [
        req.params.id
    ] 
    bd.plato_alergenos(data, res);
};
const plato_ingredientes = function (req,res) {
    let data = [
        req.params.id
    ] 
    bd.plato_ingredientes(data, res);
};
const plato_nodisponible = function(req,res){
    let data = [
        req.params.id_plato
    ]
    bd.plato_nodisponible(data,res)
}
const plato_disponible = function(req,res){
    let data = [
        req.params.id_plato
    ]
    bd.plato_disponible(data,res)
}
module.exports = {
    plato_insert: plato_insert,
    plato_delete: plato_delete,
    plato_modificar: plato_modificar,    
    plato_alergenos: plato_alergenos,
    plato_ingredientes: plato_ingredientes,
    plato_nodisponible: plato_nodisponible,
    plato_disponible: plato_disponible
};
