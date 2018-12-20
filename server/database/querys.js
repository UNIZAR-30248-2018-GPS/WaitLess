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

        let sql ='SELECT carta.id,carta.nombre,carta.precio,carta.tipo,carta.descripcion,carta.disponible, ' +
            'GROUP_CONCAT( DISTINCT alergeno.nombre ) AS nombres_alergenos,GROUP_CONCAT( DISTINCT ingrediente.nombre ) AS nombres_ingredientes FROM carta ' +
            'LEFT JOIN (SELECT alergenos.nombre,alergenos_carta.id_carta FROM alergenos LEFT JOIN alergenos_carta ON alergenos.id=alergenos_carta.id_alergeno) AS alergeno' +
            ' ON carta.id=alergeno.id_carta ' +
            'LEFT JOIN (SELECT ingrediente.nombre,ingredientes_carta.id_carta FROM ingrediente LEFT JOIN ingredientes_carta ON ingrediente.id=ingredientes_carta.id_ingrediente) AS ingrediente' +
            ' ON carta.id=ingrediente.id_carta ' +
            'GROUP BY carta.id';
        connection.query(sql,'',function (err, result) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                for (const item of result){
                    item.nombres_alergenos=item.nombres_alergenos ? item.nombres_alergenos.split(',') : [];
                    item.nombres_ingredientes=item.nombres_ingredientes ? item.nombres_ingredientes.split(',') : [];
                }
                callback(0,result)
            }
        });
    }else {
        //Busqueda con parametros, por ahora devuelvo algo distinto
        let sql ='SELECT carta.id,carta.nombre,carta.precio,carta.tipo,carta.descripcion,carta.disponible, ' +
            'GROUP_CONCAT( DISTINCT alergeno.nombre ) AS nombres_alergenos,GROUP_CONCAT( DISTINCT ingrediente.nombre ) AS nombres_ingredientes FROM carta ' +
            'LEFT JOIN (SELECT alergenos.nombre,alergenos_carta.id_carta FROM alergenos LEFT JOIN alergenos_carta ON alergenos.id=alergenos_carta.id_alergeno) AS alergeno' +
            ' ON carta.id=alergeno.id_carta ' +
            'LEFT JOIN (SELECT ingrediente.nombre,ingredientes_carta.id_carta FROM ingrediente LEFT JOIN ingredientes_carta ON ingrediente.id=ingredientes_carta.id_ingrediente) AS ingrediente' +
            ' ON carta.id=ingrediente.id_carta ' +
            'WHERE carta.tipo = ? GROUP BY carta.id';
        connection.query(sql, [tipoItem], function (err, result) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                for (const item of result){
                    item.nombres_alergenos=item.nombres_alergenos ? item.nombres_alergenos.split(',') : [];
                    item.nombres_ingredientes=item.nombres_ingredientes ? item.nombres_ingredientes.split(',') : [];
                }
                callback(0, result);
            }
        });
    }
};

// añadir a la carta
const bebida_insert = function (data, res) {
    let sql = 'INSERT INTO carta (nombre, precio, tipo, descripcion, disponible) VALUES (?)';
    connection.query(sql,[data], function (err, result) {
    if (err) throw err;
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
};
const bebida_delete = function (data, res) {
    let sql = 'DELETE FROM carta WHERE nombre = ?';
    connection.query(sql,data, function (err, result) {
    if (err) throw err;
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
};

const plato_insert = function (data, res) {
    let sql = 'INSERT INTO carta (nombre, precio, tipo, descripcion,disponible) VALUES (?)';
    connection.query(sql,[data], function (err, result) {
    if (err) throw err;
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
};
const plato_delete = function (data, res) {
    let sql = 'DELETE FROM carta WHERE nombre = ?';
    connection.query(sql,data, function (err, result) {
    if (err) throw err;
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
};
const plato_modify = function (data, res) {
    let sql = 'UPDATE carta SET nombre = ?, precio = ?, tipo = ?, descripcion = ?, disponible = ? WHERE id = ?';
    connection.query(sql,data, function (err, result) {
    if (err) throw err;
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
};

const plato_alergenos = function (data, res) {
    let sql = 'SELECT b.nombre FROM alergenos_carta a, alergenos b WHERE a.id_carta = ? and b.id= a.id_alergeno';
    connection.query(sql,data, function (err, result) {
    if (err) throw err;
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
const plato_disponible= function(data,res){
    let sql = 'UPDATE carta SET disponible = 1 WHERE id = ?';
    connection.query(sql,data, function (err, result) {
    if (err) throw err;
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
}
const plato_nodisponible= function(data,res){
    let sql = 'UPDATE carta SET disponible = 0 WHERE id = ?';
    connection.query(sql,data, function (err, result) {
    if (err) throw err;
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })    
}
// pedidos
const addPedido = function(pedido,callback){
    let sql='INSERT INTO pedido SET mesa = ?, num_comensales = ?,estado_aviso = ?,estado_aviso_cuenta = ?';
    console.log(pedido.mesa);
    connection.query(sql,[pedido.mesa,pedido.comensales,0,0],function (error,results,fields) {
        if(error){
            callback(error);
        }else {
            let sql_item = 'INSERT INTO item (id_carta,num_pedido,estado,comentario) VALUES ?';
            var values=[];
            pedido.items.forEach(function (item) {
                values.push([item.id,results.insertId,0,item.comentario]);
            });
            connection.query(sql_item,[values],function (err) {
                if(err){
                    callback(err,results.insertId);
                }else {
                    callback(false,results.insertId);
                }
            })
        }
    });
};
const getPedido = function (callback) {
    let sql = 'SELECT * FROM pedido';
    connection.query(sql,'',function (error,results,fields) {
        if(error){
            callback(error);
        }else {
            callback(false,results);
        }
    })
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

const borrar_pedido = function (idPedido,callback) {

    let sql_item = 'DELETE FROM item WHERE num_pedido = ?';
    connection.query(sql_item,idPedido,function (err_item,result) {
        if(err_item){
            callback(err_item);
        }else{
            let sql ='DELETE FROM pedido WHERE num_pedido = ?';
            connection.query(sql,idPedido,function (err) {
                if(err){
                    callback(err);
                }else {
                    callback(false);
                }
            })
        }
    })
};



// Servicios
const get_avisos = function (res) {
    let sql = 'SELECT mesa, estado_aviso FROM pedido WHERE estado_aviso = 1'
    connection.query(sql, function (err, result) {
    if (err) throw err
    if (result[0] === undefined) {
        res.status(204).send()
      } else {
        res.status(200).send(result)
      }
  })
};
const call_camarero_avisos = function (data, res) {
    let sql = 'update pedido set estado_aviso = ? where mesa=? and estado_aviso_cuenta=0'
    connection.query(sql,data, function (err, result) {
    if (err) throw err
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
};

const pedir_cuenta = function (data, res) {
    let sql = 'update pedido set estado_aviso_cuenta = 1 WHERE num_pedido=(select j.num_pedido from item i, item j where i.estado <> 2 and i.num_pedido=j.num_pedido = 0) and num_pedido = ?'
    connection.query(sql,data, function (err, result) {
    if (err) throw err
    if (result.affectedRows === 0) {
        // no se puede pedir la cuenta porque no todo el pedido esta terminado
        res.status(500).send()
      } else {
        res.status(200).send()
      }
  })
};
module.exports = {
    getAllCarta: getAllCarta,
    addPedido: addPedido,
    getPedido: getPedido,
    borrar_pedido:borrar_pedido,
    bebida_delete: bebida_delete,
    bebida_insert: bebida_insert,
    plato_insert: plato_insert,
    plato_delete: plato_delete,
    plato_modify: plato_modify,
    plato_ingredientes: plato_ingredientes,
    plato_alergenos: plato_alergenos,
    plato_disponible: plato_disponible,
    plato_nodisponible: plato_nodisponible,
    actualizar_pedido: actualizar_pedido,
    get_avisos: get_avisos,
    call_camarero_avisos: call_camarero_avisos,
    pedir_cuenta: pedir_cuenta

};
