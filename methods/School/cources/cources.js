const mysqlLib = require('../../../@libs/mysql.lib');
// ${params.query && `AND WHERE fio LIKE '%${params.query}%'`}
const sqlRows = (params) => {
    return `
        SELECT * 
        FROM courses
        ${params.query && `WHERE course_name LIKE '%${params.query}%'`}
        ${params.courseId ? `WHERE courseId = ${params.courseId}` : ''}
        LIMIT ${params.rowPerPage}
        OFFSET ${params.offset}
    `
}

const sqlCount = `
  SELECT COUNT(*) as count
  FROM courses
`

async function findSchoolCourcesApp(params) {
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

module.exports = findSchoolCourcesApp;
