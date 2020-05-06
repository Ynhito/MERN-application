const mysqlLib = require('../../../@libs/mysql.lib');

async function createSchoolLessonApp(params) {
    try {
        const sqlCourse = `
            INSERT INTO lessons (course_id, date, lesson_name, teacher_id) 
            VALUES (${params.course_id}, '${params.date}', '${params.lesson_name}', ${params.teacher_id})
        `
        await mysqlLib.executeQuery(sqlCourse);

      }
      catch (e) {
        return e;
      }
}

module.exports = createSchoolLessonApp;
