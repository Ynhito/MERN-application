const mysqlLib = require('../../../@libs/mysql.lib');

const sqlRows = (params) => {
    return `
        SELECT * 
        FROM accounts
        INNER JOIN lessons
        ON accounts.lessonId = lessons.lessonId
        WHERE accountId = ${params.accountId}
        LIMIT ${params.rowPerPage}
        OFFSET ${params.offset}
    `
}

const sqlCount = `
  SELECT COUNT(*) as count
  FROM accounts
`

async function findSchoolAccountsApp(params) {
    try {
        const rows = await mysqlLib.executeQuery(sqlRows({
          ...params,
          offset: params.rowPerPage * params.page
        }));
        console.log(rows)
        const count = (await mysqlLib.executeQuery(sqlCount))[0].count;
        return {
          rows,
          count
        };
      }
      catch (e) {
        return e;
      }
}

module.exports = findSchoolAccountsApp;
