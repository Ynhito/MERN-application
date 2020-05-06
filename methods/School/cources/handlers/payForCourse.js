const mysqlLib = require('../../../../@libs/mysql.lib');

const sqlPayments = (params) => {
    return `
        SELECT * 
        FROM payment
        WHERE student_id = ${params.studentId} AND lesson_id = ${params.condition}
    `
}

async function getStudentPayment(studentId, info, lessons) {
    try {
        const condition = lessons.map((e, i) => i === 0 ? e : `OR lesson_id = ${e}`).join(' ');
        const payments = await mysqlLib.executeQuery(sqlPayments({studentId, condition}));

        return {
          summ: payments.length * +(info.price / info.lesson_count).toFixed(2),
          count: payments.length,
        };

      }
      catch (e) {
        return e;
      }
}

module.exports = getStudentPayment;
