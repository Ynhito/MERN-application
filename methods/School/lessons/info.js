const mysqlLib = require('../../../@libs/mysql.lib');
const getIsVisitLesson = require('./handlers/isVisitLesson');
const getIsPaymentLesson = require('./handlers/isPaymentLesson');

const sqlSubs = (params) => {
    return `
        SELECT * 
        FROM subscribe
        INNER JOIN students
        ON subscribe.student_id = students.student_id
        WHERE subscribe.course_id = ${params.course_id}
        LIMIT ${params.rowPerPage}
        OFFSET ${params.offset}
    `
}

const sqlInfo = (params) => {
    return `
        SELECT * 
        FROM lessons
        WHERE lesson_id = ${params.lesson_id}
    `
}

const sqlCount = (params) => {
    return `
        SELECT COUNT(*) as count
        FROM subscribe
        WHERE subscribe.course_id = ${params.course_id}
    `
}

async function infoSchoolLessonsApp(params) {
    try {
        const info = (await mysqlLib.executeQuery(sqlInfo({...params})))[0];
        const subs = await mysqlLib.executeQuery(sqlSubs({
          ...params,
          offset: params.rowPerPage * params.page
        }));

        const rows = await Promise.all(subs.map( async student => {
            const isVisit = await getIsVisitLesson(params.lesson_id, student.student_id);
            const isPayment = await getIsPaymentLesson(params.lesson_id, student.student_id);
            
            return {
                student,
                isVisit,
                isPayment,
            }
        }))
        const count = (await mysqlLib.executeQuery(sqlCount({...params})))[0].count;

        return {
          rows,
          count,
          info,
        };
      }
      catch (e) {
        return e;
      }
}

module.exports = infoSchoolLessonsApp;
