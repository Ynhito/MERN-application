const mysqlLib = require('../../../@libs/mysql.lib');

// const sqlRows = (params) => {
//     return `
//         SELECT * 
//         FROM students 
//         ${params.query && `WHERE fio LIKE '%${params.query}%'`}
//         ORDER BY ${params.orderBy} ${params.order}
//         LIMIT ${params.rowPerPage}
//         OFFSET ${params.offset}
//     `
// }

// const sqlCount = `
//   SELECT COUNT(*) as count
//   FROM students
// `
// ${params.query && `WHERE fio LIKE '%${params.query}%'`}
// ORDER BY ${params.orderBy} ${params.order}
//       LIMIT ${params.rowPerPage}
//       OFFSET ${params.offset}
const sqlStudents = (params) => { // Люди подписавшиеся на курс
  return `
      SELECT * 
      FROM subscribe
      WHERE course_id = ${params.course_id}
  `
}

const sqlLessons = (params) => { // Занятия курса
  return `
      SELECT * 
      FROM lessons
      WHERE course_id = ${params.course_id}
  `
}

const sqlVisit = (params) => { // Люди подписавшиеся на курс
  return `
      SELECT * 
      FROM visit
      WHERE lesson_id = ${params.lesson_id}
  `
}

async function findSchoolStudentsApp(params) {
    try {
        const students = await mysqlLib.executeQuery(sqlStudents({
          ...params,
          course_id: 1,
          offset: params.rowPerPage * params.page
        }));
        const lessons = await mysqlLib.executeQuery(sqlLessons({
          ...params,
          course_id: 1,
          offset: params.rowPerPage * params.page
        }));
        const visit = await Promise.all(lessons.map(async (e) => {
          return await mysqlLib.executeQuery(sqlVisit({
            ...params,
            lesson_id: e.lesson_id,
            offset: params.rowPerPage * params.page
          }))
        }))
        console.log('students' + JSON.stringify(students))
        console.log('lessons' + JSON.stringify(lessons))
        console.log('visit' + JSON.stringify(visit))
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

module.exports = findSchoolStudentsApp;
