const mysqlLib = require('../../../@libs/mysql.lib');
const getStudentPayForMonth = require('./handlers/payForCourse');
const getStudentInfo = require('./handlers/student-info');
const getLessonOfCourse = require('./handlers/lessonsOfCourse');
const getStudentVisit = require('./handlers/visitForCourse');
const getVisitForMonth = require('./handlers/visitForMonth');

const sqlSubscribers = (params) => {
    return `
        SELECT * 
        FROM subscribe
        WHERE course_id = ${params.courseId}
    `
}

const sqlInfo = (params) => {
    return `
        SELECT * 
        FROM cources
        WHERE course_id = ${params.courseId}
    `
}

const sqlCount = (params) => {
    return `
    SELECT COUNT(*) as count
    FROM subscribe
    WHERE course_id = ${params.courseId}`
}

async function infoSchoolCourcesApp(params) {
    try {
        const lessons = (await getLessonOfCourse(params.courseId)).map(e => e.lesson_id);
        const subscribers = await mysqlLib.executeQuery(sqlSubscribers({...params}));
        const info = (await mysqlLib.executeQuery(sqlInfo({...params})))[0];
        const rows = await Promise.all(subscribers.map( async e => {
            const student = await getStudentInfo(e.student_id);
            const payment = await getStudentPayForMonth(e.student_id, info, lessons);
            const visit = await getStudentVisit(e.student_id, lessons);
            const monthVisit = await getVisitForMonth(e.student_id, params.courseId);
            let debt;
            
            if (payment.count !== visit && (payment.count > 0 || visit > 0)) {
                if (payment.count > visit) {
                    debt = (payment.count - visit) * +(info.price / info.lesson_count).toFixed(2);
                } else {
                    debt = (visit - payment.count) * +(info.price / info.lesson_count).toFixed(2);
                }
            } else {
                debt = 0;
            }
            return {
                student,
                payment: payment.summ,
                visit,
                monthVisit,
                debt,
            }
        }))

        const count = (await mysqlLib.executeQuery(sqlCount({...params})))[0].count;
        return {
            info,
            rows,
            count
        };
      }
      catch (e) {
        return e;
      }
}

module.exports = infoSchoolCourcesApp;
