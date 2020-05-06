const mysqlLib = require('../../../@libs/mysql.lib');

const sqlRows = (params) => {
    return `
        SELECT * 
        FROM cources
        ${params.query && `WHERE course_name LIKE '%${params.query}%'`}
        LIMIT ${params.rowPerPage}
        OFFSET ${params.offset}
    `
}

const sqlCount = `
  SELECT COUNT(*) as count
  FROM cources
`

async function findSchoolCourcesApp(params) {
    try {
        const rows = await mysqlLib.executeQuery(sqlRows({
          ...params,
          offset: params.rowPerPage * params.page
        }));
        // console.log('FINA' + rows)
        const count = (await mysqlLib.executeQuery(sqlCount))[0].count;
        return {
          rows,
          count
        };
      }
      catch (e) {
        return e;
      }
}

module.exports = findSchoolCourcesApp;
