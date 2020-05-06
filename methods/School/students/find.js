const mysqlLib = require('../../../@libs/mysql.lib');

const sqlStudents = (params) => {
  return `
      SELECT age, students.debt, name, parent_firstname, parent.parent_id, parent_secondname, students.payment, second_name, student_id
      FROM students
      INNER JOIN parent
      ON students.parent_id = parent.parent_id
      ${params.query && `WHERE name LIKE '%${params.query}%' OR second_name LIKE '%${params.query}%'`}
      LIMIT ${params.rowPerPage}
      OFFSET ${params.offset}
  `
}

const sqlCourses = (params) => {
  return `
      SELECT * 
      FROM subscribe
      WHERE student_id = ${params.student_id}
  `
}

const sqlCount = `
  SELECT COUNT(*) as count
  FROM students
`

async function findSchoolStudentsApp(params) {
    try {
        const rows = await mysqlLib.executeQuery(sqlStudents({
          ...params,
          offset: params.rowPerPage * params.page
        }));

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
