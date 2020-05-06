const mysqlLib = require('../../../@libs/mysql.lib');
const sqlRows = (params) => {
    return `
        SELECT * 
        FROM lessons
        INNER JOIN cources
        ON lessons.course_id = cources.course_id
        INNER JOIN teachers
        ON lessons.teacher_id = teachers.teacher_id
        ${params.query && `WHERE lesson_name LIKE '%${params.query}%'`}
        LIMIT ${params.rowPerPage}
        OFFSET ${params.offset}
    `
}

const sqlCount = `
  SELECT COUNT(*) as count
  FROM lessons
`

async function findSchoolLessonsApp(params) {
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

module.exports = findSchoolLessonsApp;
