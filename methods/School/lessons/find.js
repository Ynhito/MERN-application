const mysqlLib = require('../../../@libs/mysql.lib');
const sqlRows = (params) => {
    return `
        SELECT * 
        FROM lessons
        INNER JOIN teachers
        ON lessons.teacherId = teachers.teacherId
        INNER JOIN courses
        ON lessons.courseId = courses.courseId
        ${params.lessonId ? `WHERE lessonId = ${params.lessonId}` : ''}
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
