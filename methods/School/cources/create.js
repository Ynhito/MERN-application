const mysqlLib = require('../../../@libs/mysql.lib');

async function createSchoolCourseApp(params) {
    try {
        const sqlCourse = `
            INSERT INTO cources (price, lesson_count, course_name, date_start, date_end) 
            VALUES (${params.price}, ${params.lesson_count}, '${params.course_name}', '${params.date_end}', '${params.date_end}')
        `
        await mysqlLib.executeQuery(sqlCourse);

      }
      catch (e) {
        return e;
      }
}

module.exports = createSchoolCourseApp;
