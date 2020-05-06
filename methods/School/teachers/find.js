const mysqlLib = require('../../../@libs/mysql.lib');
const sqlRows = (params) => {
    return `
        SELECT * 
        FROM teachers
        ${params.query && `WHERE teacher_fullName LIKE '%${params.query}%'`}
        LIMIT ${params.rowPerPage}
        OFFSET ${params.offset}
    `
}

const sqlCount = `
  SELECT COUNT(*) as count
  FROM teachers
`

async function findSchoolTeachersApp(params) {
    try {
        const rows = await mysqlLib.executeQuery(sqlRows({
          ...params,
          offset: params.rowPerPage * params.page
        }));
        console.log(rows)
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

module.exports = findSchoolTeachersApp;
