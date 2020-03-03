const mysqlLib = require('../../@libs/mysql.lib');

const sql = (params) => {
    return `
        SELECT * FROM electrocars ORDER BY ${params.orderBy} ${params.order}
        ${params.query ? `WHERE title = ${params.query}` : ''}
    `
}

async function findElectroCardApp(params) {
    try {
        const rows = await mysqlLib.executeQuery(sql(params));
        return rows;
      }
      catch (e) {
        return e;
      }
}

module.exports = findElectroCardApp;
