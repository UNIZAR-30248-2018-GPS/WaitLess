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

/**
* Función que realiza una búsqueda en la BD y devuelve un JSON
* con los datos de carta, ingredientes y alergenos. En call_camarero_avisos
* de error lanzan un código de error
* @params tipoItem
* @params callback
* @returns result
*/
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
                    item.disponible=!!+item.disponible;
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
                    item.disponible=!!+item.disponible;
                }
                callback(0, result);
            }
        });
    }
};

/**
* Función que realiza una inserción en la tabla carta de la BD
* de un producto de la carta (nombre->string, precio->double,
*  tipo-> 0 PLATO /1 BEBIDA /2 menu, descripción->string, disponible->boolean)
* En de error lanzan un código de error
* @params data
* @params res
* @returns res.status
*/
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


/**
* Función que realiza un borrado de bebidas  en la tabla carta de la BD
* de un producto de la carta cuyo nombre el dado.
* En de error lanzan un código de error
* @params data
* @params res
* @returns res.status
*/
const bebida_delete = function (data, res) {
    let sql = 'DELETE FROM carta WHERE id = ?';
    connection.query(sql,data, function (err, result) {
    if (err) throw err;
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
};

/**
* Función que realiza una inserción en la tabla carta de la BD
* de un producto de la carta (nombre->string, precio->double,
*  tipo-> 0 PLATO /1 BEBIDA /2 menu, descripción->string, disponible->boolean)
* En de error lanzan un código de error
* @params data
* @params res
* @returns res.status
*/
const plato_insert = function (data, data1, data2, res) {
    let sql = 'INSERT INTO carta (nombre, precio, tipo, descripcion,disponible) VALUES (?)';
    connection.query(sql, [data], function (err, result) {
        if (err) throw err;
        if (result.affectedRows === 0) {
            res.status(201).send()
        } else {
                let sql_alerg = 'INSERT INTO alergenos_carta (id_carta,id_alergeno) VALUES ?';
                var values = [];
                if (data1.length > 0) {
                        data1.forEach(function (item) {
                        values.push([result.insertId, item]);
                    });
                    connection.query(sql_alerg, [values], function (err) {
                        if (err) throw err;
                            
                    })
                }
                let sql_ing = 'INSERT INTO ingredientes_carta (id_carta,id_ingrediente) VALUES ?';
                var values = [];
                if (data2.length >0){
                            data2.forEach(function (item) {
                            values.push([result.insertId, item]);
                    });
                    connection.query(sql_ing, [values], function (err) {
                        if (err) throw err;
                        else res.status(201).send();
                    })
                }
        }   
        res.status(200).send()
    })
};

/**
* Función que realiza el borrado de un plato de la tabla carta. En caso de
* error lanza un código de error 201
* @params data
* @params res
* @returns res.status
*/
const plato_delete = function (data, res) {
    let sql = 'DELETE FROM carta WHERE id = ?';
    connection.query(sql,data, function (err, result) {
    if (err) throw err;
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
};

/**
* Función que realiza la modificación de un plato de la tabla carta. En caso de
* error lanza un código de error 201
* @params data
* @params res
* @returns res.status
*/
const plato_modify = function (data, res) {
    let sql = 'UPDATE carta SET nombre = ?, precio = ?, descripcion = ? WHERE id = ?';
    connection.query(sql,data, function (err, result) {
    if (err) throw err;
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
};

/**
* Función que muestra los alergenos de un plato. En caso de error
* lanza un código de error 201
* @params data
* @params res
* @returns result
*/
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

/**
 * Función que permite añadir un ingrediente a la tabla ingrediente. En caso de error
 * lanza un código de error 204
 * @params data
 * @params res
 * @returns result
 */
const anadir_despensa = function (data, res) {
    let sql = 'INSERT INTO ingrediente(nombre) VALUES (?) ';
    connection.query(sql,data, function (err, result) {
        if (err) throw err;
        if (result.affectedRows === 0) {
            res.status(204).send()
        } else {
            res.status(200).send(result)
        }
    })
};

/**
 * Función que muestra todos los alérgenos. En caso de error
 * lanza un código de error 204
 * @params data
 * @params res
 * @returns result
 */
const getAllAlergenos = function (res) {
    let sql = 'SELECT * FROM alergenos';
    connection.query(sql, function (err, result) {
        if (err) throw err;
        if (result[0] === undefined) {
            res.status(204).send()
        } else {
            res.status(200).send(result)
        }
    })
};

/**
 * Función que muestra todos los ingredientes. En caso de error
 * lanza un código de error 204
 * @params data
 * @params res
 * @returns result
 */
const getAllIngredientes = function (res) {
    let sql = 'SELECT * FROM ingrediente';
    connection.query(sql, function (err, result) {
        if (err) throw err;
        if (result[0] === undefined) {
            res.status(204).send()
        } else {
            res.status(200).send(result)
        }
    })
};


/**
* Función que muestra los ingredientes de un plato. En caso de error
* lanza un código de error 201
* @params data
* @params res
* @returns result
*/
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

/**
* Función que activa la disponibilidad de un plato. En caso de
* lanza un código de error 201
* @params data
* @params res
* @returns res.status
*/
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

/**
* Función que desactiva la disponibilidad de un plato. En caso de
* lanza un código de error 201
* @params data
* @params res
* @returns res.status
*/
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

/**
* Función que añade un pedido a la tabla pedidos.
* @params pedido
* @params callback
* @returns results.insertId
*/
const addPedido = function(pedido,callback){
    let sql='INSERT INTO pedido SET mesa = ?, num_comensales = ?,estado_aviso = ?,estado_aviso_cuenta = ?';
    console.log(pedido.mesa);
    connection.query(sql,[pedido.mesa,pedido.comensales,0,0],function (error,results,fields) {
        console.log(results);
        if(error){
            callback(error);
        }else {
            let sql_item = 'INSERT INTO item (id_carta,num_pedido,estado,comentario) VALUES ?';
            var values=[];
            pedido.items.forEach(function (item) {
                values.push([item.id,results.insertId,0,item.comentario]);
            });
            connection.query(sql_item,[values],function (err,results_item) {
                if(err){
                    callback(err,results.insertId);
                }else {
                    var rowIds = [];
                    for(var i = results_item.insertId; i < results_item.insertId + results_item.affectedRows*10;i=i+10){
                        rowIds.push(i);
                    }
                    callback(false,results.insertId,rowIds);
                }
            })
        }
    });
};

/**
* Función que obtiene un pedido a la tabla pedidos.
* @params callback
* @returns results
*/
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

/**
* Función que actualiza un pedido a la tabla pedidos. En caso de error
* devuelve un código de error 201
* @params data
* @params res
*/
const actualizar_pedido = function (data, res) {
    let sql = 'UPDATE item SET estado = ? WHERE id_item = ? AND num_pedido = ? ';
    connection.query(sql,data, function (err, result) {
    if (err) throw err
    if (result.affectedRows === 0) {
        res.status(201).send()
      } else {
        res.status(200).send()
      }
  })
};

/**
* Función que elimina un pedido a la tabla pedidos.
* @params idPedido
* @params callback
*/
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

const getPedidoSinTerminar =function (callback) {
    let sql = 'SELECT pedido.num_pedido,' +
        'pedido.mesa,' +
        'pedido.num_comensales,' +
        'pedido.estado_aviso,' +
        'pedido.estado_aviso_cuenta,' +
        ' GROUP_CONCAT(carta.nombre) as item_nombre,' +
        'GROUP_CONCAT(item.estado) as item_estado,' +
        'GROUP_CONCAT(item.comentario) as item_comentario,  ' +
        'GROUP_CONCAT(item.id_item) as item_id  ' +
        'FROM pedido, item,carta WHERE pedido.num_pedido=item.num_pedido AND item.id_carta = carta.id  AND item.estado=0 GROUP BY pedido.num_pedido';
    connection.query(sql, function (err,result) {
        if(err){
            console.log(err);
            callback(err);
        }else{
            callback(0,result);
        }
    })
};


/**
* Función que devuelve los avisos que se ha realizado en un pedido. En caso de
* error devuelve un código de error 204
* @params res
* @returns result
*/
const get_avisos = function (res) {
    let sql = 'SELECT mesa, estado_aviso FROM pedido WHERE estado_aviso = 1'
    connection.query(sql, function (err, result) {
    if (err) throw err
    if (result.affectedRows === 0) {
        res.status(404).send()
      } else {
        res.status(200).send(result)
      }
  })
};

/**
* Función que desactiva un aviso del camarero. En caso de
* error devuelve un código de error 201
* @params data
* @params res
*/
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

/**
* Función que permite solicitar la cuenta modificando el campo
* estado_aviso_cuenta a 1. Sólo lo realiza si todos los platos se han servido.
* En caso de error devuelve un código de error 500
* @params data
* @params res
*/
const pedir_cuenta = function (data, res) {
    let sql = 'UPDATE pedido SET estado_aviso_cuenta = 1 WHERE num_pedido=(SELECT num_pedido FROM item i WHERE num_pedido= ? AND NOT EXISTS (SELECT * FROM item j WHERE i.num_pedido=j.num_pedido AND j.estado <> 2) LIMIT 1)'
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

/**
 * Función que permite indicar al camarero que la cuenta ya ha sido pagada. En caso de error devuelve un código
 * 201
 * @params data
 * @params res
 */
const finalizar_cuenta = function (data, res) {
    let sql = 'UPDATE pedido SET estado_aviso_cuenta = 2 WHERE num_pedido=?'
    connection.query(sql,data, function (err, result) {
        if (err) throw err
        if (result.affectedRows === 0) {
            res.status(201).send()
        } else {
            res.status(200).send()
        }
    })
};
module.exports = {
    getAllCarta: getAllCarta,
    addPedido: addPedido,
    getPedido: getPedido,
    getPedidoSinTerminar: getPedidoSinTerminar,
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
    pedir_cuenta: pedir_cuenta,
    anadir_despensa: anadir_despensa,
    getAllAlergenos: getAllAlergenos,
    getAllIngredientes: getAllIngredientes,
    finalizar_cuenta: finalizar_cuenta
};
