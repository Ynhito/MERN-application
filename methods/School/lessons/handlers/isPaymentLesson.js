const mysqlLib = require('../../../../@libs/mysql.lib');

const sqlVisit = (params) => {
    return `
        SELECT * 
        FROM payment
        WHERE lesson_id = ${params.lesson_id} AND student_id = ${params.student_id}
    `
}

async function getIsPaymentLesson(lesson_id, student_id) {
    try {
        console.log('LOGLOGLOG' + lesson_id + 'LOGLOGLOG' + student_id)
        const visit = await mysqlLib.executeQuery(sqlVisit({lesson_id, student_id}));
        console.log('qqqqqqqqqqqq' + visit.length > 0)
        return visit.length > 0;

      }
      catch (e) {
        return e;
      }
}

module.exports = getIsPaymentLesson;
