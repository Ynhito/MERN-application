const mysqlLib = require('../../../../@libs/mysql.lib');

const sqlInfo = (studentId) => {
    return `
        SELECT * 
        FROM students
        WHERE student_id = ${studentId}
    `
}

async function getStudentInfo(studentId) {
    try {

        return (await mysqlLib.executeQuery(sqlInfo(studentId)))[0];

      }
      catch (e) {
        return e;
      }
}

module.exports = getStudentInfo;
