const mysqlLib = require('../../../../@libs/mysql.lib');

const sqlVisit = (params) => {
    return `
        SELECT * 
        FROM visit
        WHERE student_id = ${params.studentId} AND lesson_id = ${params.condition}
    `
}

async function getStudentVisit(studentId, lessons) {
    try {
        console.log('LOGLOGLOG' + lessons)
        const condition = lessons.map((e, i) => i === 0 ? e : `OR lesson_id = ${e}`).join(' ');
        const visit = await mysqlLib.executeQuery(sqlVisit({studentId, condition}));
        
        return visit.length;

      }
      catch (e) {
        return e;
      }
}

module.exports = getStudentVisit;
