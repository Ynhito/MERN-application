const {Router} = require('express');
const mysqlLib = require('../@libs/mysql.lib');

const router = Router();

router.get(
    '/find',
    async (req, res) => {
      try {
        const rows = await mysqlLib.executeQuery('SELECT * FROM electrocars');
        res.status(201).json({ rows })
      }
      catch (e) {
          res.status(500).json({ message: 'Что-то пошло не так' })
      }
    })

module.exports = router;