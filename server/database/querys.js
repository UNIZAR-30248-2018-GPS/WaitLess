//TODO: Interaccion con la base de datos, por ahora las funciones sirven de mock
var mysql = require('mysql');
var connection_cfg = {
    host : 'eu-cdbr-west-02.cleardb.net',
    user: 'b4abd6312e0613',
    password: 'b9415534',
    database: 'heroku_de42e77cc297366'
};

var connection;

function connectionHandler(){
    connection = mysql.createConnection(connection_cfg);
    connection.connect(function (err) {
        if(err){
            console.log('Error al conectar a MySql');
        }

    });
    connection.on('error', function(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Reconectando a bd...');
            connectionHandler();
        } else {
            throw err;
        }
    });
}
connectionHandler();
const getAllCarta = function (tipoItem, callback) {
    if(tipoItem===undefined || tipoItem===null) {
        let sql ='SELECT * FROM carta';
        connection.query(sql,'',function (err,result) {
            if(err){
                callback(err);
            }else{
                callback(0,result);
            }
        });
    }else {
        //Busqueda con parametros, por ahora devuelvo algo distinto
        let sql = 'SELECT * FROM carta WHERE tipo = ?';
        connection.query(sql, [tipoItem], function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(0, result);
            }
        });
    }
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

const plato_alergenos = function (data, res) {
    let sql = 'SELECT b.nombre FROM alergenos_carta a, alergenos b WHERE a.id_carta = ? and b.id= a.id_alergeno'
    connection.query(sql,data, function (err, result) {
    if (err) throw err
    if (result[0] === undefined) {
        res.status(204).send()
      } else {
        res.status(200).send(result)
      }
  })
};

const plato_ingredientes = function (data, res) {
    let sql = 'SELECT c.nombre FROM ingredientes_carta a, ingrediente c WHERE c.id= a.id_ingrediente and a.id_carta = ? '
    connection.query(sql,data, function (err, result) {
    if (err) throw err
    if (result[0] === undefined) {
        res.status(204).send()
      } else {
        res.status(200).send(result)
      }
  })
};


// pedidos
const addPedido = function(pedido,callback){
    let sql='INSERT INTO pedido SET mesa = ?, num_comensales = ?';
    console.log(pedido.mesa);
    connection.query(sql,[pedido.mesa,pedido.comensales],function (error,results,fields) {
        if(error){
            callback(error);
        }else {
            let sql_item = 'INSERT INTO item SET nombre = ?, cantidad = ? , num_pedido = ?, estado=0';
            pedido.items.forEach(function (item) {
                connection.query(sql_item,[item.nombre,item.cantidad,results.insertId],function (err,results,fields) {
                    if(err){
                        callback(err);
                    }else {
                        callback(0);
                    }
                })
            });
        }
    });
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
    plato_ingredientes: plato_ingredientes,
    plato_alergenos: plato_alergenos,
    actualizar_pedido: actualizar_pedido,
    get_avisos: get_avisos

};