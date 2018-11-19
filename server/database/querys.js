//TODO: Interaccion con la base de datos, por ahora las funciones sirven de mock
var mysql = require('mysql')
var connection = mysql.createConnection({
    host : 'eu-cdbr-west-02.cleardb.net',
    user: 'b4abd6312e0613',
    password: 'b9415534',
    database: 'heroku_de42e77cc297366'
});
connection.connect();
const getAllCarta = function () {
    return [{
        "nombre":'Plato 1',
        "id":'id1',
        "precio":0.1,
        "tipo":0
    },
    {
        "nombre":'Plato 2',
        "id":'id2',
        "precio":2,
        "tipo":1
    },
    {
        "nombre":'Plato 3',
        "id":'id3',
        "precio":0.1,
        "tipo":2
    }];
};

// añadir a la carta
const bebida_insert = function (data, res) {
    let sql = 'INSERT INTO carta (nombre, precio, tipo) VALUES (?)'
    connection.query(sql,[data], function (err, result) {
    if (err) throw err
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
};
const bebida_delete = function (data, res) {
    let sql = 'DELETE FROM carta WHERE nombre = ?'
    connection.query(sql,data, function (err, result) {
    if (err) throw err
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
};

const plato_insert = function (data, res) {
    let sql = 'INSERT INTO carta (nombre, precio, tipo, descripcion) VALUES (?)'
    connection.query(sql,[data], function (err, result) {
    if (err) throw err
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
};
const plato_delete = function (data, res) {
    let sql = 'DELETE FROM carta WHERE nombre = ?'
    connection.query(sql,data, function (err, result) {
    if (err) throw err
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
};
const plato_modify = function (data, res) {
    let sql = 'UPDATE carta SET nombre = ?, precio = ?, tipo = ?, descripcion = ? WHERE id = ?'
    connection.query(sql,data, function (err, result) {
    if (err) throw err
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
};

// pedidos
const addPedido = function(pedido){
    //De momento no hago nada
    return true;
};

const actualizar_pedido = function (data, res) {
    let sql = 'UPDATE item SET estado = ? WHERE id_item = ? AND num_pedido = ? AND estado = ?'
    connection.query(sql,data, function (err, result) {
    if (err) throw err
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
};

// Servicios
const get_avisos = function (data, res) {    
    let sql = 'SELECT * FROM aviso WHERE estado = ?'
    connection.query(sql,data, function (err, result) {
    if (err) throw err
    if (result[0] === undefined) {
        res.status(204).send()
      } else {
        res.status(200).send(result)
      }
  })
};

module.exports = {
    getAllCarta: getAllCarta,
    addPedido: addPedido,
    bebida_delete: bebida_delete,
    bebida_insert: bebida_insert,
    plato_insert: plato_insert,
    plato_delete: plato_delete,
    plato_modify: plato_modify,
    actualizar_pedido: actualizar_pedido,
    get_avisos: get_avisos

};