const mysql = require('mysql');
const mysqlConfig = {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'practic'
}

var pool = mysql.createPool(mysqlConfig);

module.exports.connect = function (cb) {
  return new Promise((resolve, reject) => {
    pool.on('connection', function (connection) {
      connection.on('error', function (err) {
        console.error('MySQL error event', err)
      });
      connection.on('close', function (err) {
        console.warn('MySQL close event', err)
      });
    });
    resolve()
  })
}

async function executeQuery (query, param) {
  console.debug(`query: `, query)
  return new Promise((resolve, reject) => {
    try{
      pool.query(query, param, (e, r, f) => {
        if(e){
          reject(e)
        }
        else{
          console.debug(r,f)
          resolve(r)
        }
      });
    }
    catch(ex){
      reject(ex)
    }
  })  
}

async function execSP(spName, params){
  return new Promise((resolve, reject) => {
    try{
      var paramPlaceHolder = ''
      if(params && params.length){
        for(var i = 0; i < params.length; i++){
          paramPlaceHolder += '?,'
        }
      }
      if(paramPlaceHolder.length){
        paramPlaceHolder = paramPlaceHolder.slice(0, -1)
      }
      console.debug('final SP call', `CALL ${spName}(${params})`)
      pool.query(`CALL ${spName}(${paramPlaceHolder})`, params, (e, r, f) => {
        if(e){
          reject(e)
        }
        else{
          resolve(r[0])
        }
      });
    }
    catch(ex){
      reject(ex)
    }
  })
}
module.exports.executeQuery = executeQuery
module.exports.execSP = execSP