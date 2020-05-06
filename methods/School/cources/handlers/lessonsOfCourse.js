const mysqlLib = require('../../../../@libs/mysql.lib');

const sqlLessons = (courseId) => {
    return `
        SELECT * 
        FROM lessons
        WHERE course_id = ${courseId}
    `
}

async function getLessonOfCourse(courseId) {
    try {
        const rows = await mysqlLib.executeQuery(sqlLessons(courseId));
        return rows;
      }
      catch (e) {
        return e;
      }
}

module.exports = getLessonOfCourse;
