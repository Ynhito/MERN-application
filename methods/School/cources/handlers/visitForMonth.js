const mysqlLib = require('../../../../@libs/mysql.lib');

const sqlVisit = (params) => {
    return `
        SELECT * 
        FROM visit
        WHERE student_id = ${params.studentId} ${params.condition}
    `
}

const sqlLessons = (courseId) => (
    `
        SELECT * 
        FROM lessons
        WHERE MONTH(lessons.date) = ${new Date().getMonth() + 1} AND course_id = ${courseId}
    `
)

async function getVisitForMonth(studentId, courseId) {
    try {
        const monthLessons = (await mysqlLib.executeQuery(sqlLessons(courseId))).map(e => e.lesson_id);
        const condition = monthLessons.map((e, i) => (i === 0 && e) 
            ? `AND lesson_id = ${e}` : 
                `OR lesson_id = ${e}`).join(' ');
        const visit = await mysqlLib.executeQuery(sqlVisit({studentId, condition}));
        
        return monthLessons.length > 0 ? visit.length : 0;

      }
      catch (e) {
        return e;
      }
}

module.exports = getVisitForMonth;
