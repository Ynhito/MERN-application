const mysqlLib = require('../../../@libs/mysql.lib');

const sqlMax = `
    Select max(parent_id) as 'maxid' from parent
`

async function createSchoolStudentsApp(params) {
    try {
        const lastId = (await mysqlLib.executeQuery(sqlMax))[0].maxid + 1;
        console.log(lastId)
        const sqlParent = `
            INSERT INTO parent (parent_id, payment, debt, parent_firstName, parent_secondname) 
            VALUES (${lastId}, 0, 0, '${params.parent_firstName}', '${params.parent_lastName}')`
        const sqlStudent = `
            INSERT INTO students (payment, debt, second_name, name, parent_id, age) 
            VALUES (0, 0, '${params.lastName}', '${params.firstName}', ${lastId}, ${params.age})
        `
        await mysqlLib.executeQuery(sqlParent);
        await mysqlLib.executeQuery(sqlStudent);

      }
      catch (e) {
        return e;
      }
}

module.exports = createSchoolStudentsApp;
