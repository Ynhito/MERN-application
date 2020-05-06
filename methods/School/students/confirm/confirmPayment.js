const mysqlLib = require('../../../../@libs/mysql.lib');

const sqlInfo = (params) => {
    return `
        SELECT * 
        FROM cources
        WHERE course_id = ${params.courseId}
    `
}

async function confirmPaymentApp(params) {
    try {
        const info = (await mysqlLib.executeQuery(sqlInfo({...params})))[0];
        const sqlPayment = `
            INSERT INTO payment (lesson_id, student_id) 
            VALUES (${params.lesson_id}, ${params.student_id})`
        const sqlUpdateStudent = `
            UPDATE students 
            SET debt = debt + ${+(info.price / info.lesson_count).toFixed(2)};
        `
        await mysqlLib.executeQuery(sqlPayment);
        await mysqlLib.executeQuery(sqlUpdateStudent);

      }
      catch (e) {
        return e;
      }
}

module.exports = confirmPaymentApp;
