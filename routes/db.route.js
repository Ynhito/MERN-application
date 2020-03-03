const {Router} = require('express');
const router = Router();
const electroCardApp = require('../methods/Electrocars/find');

router.get(
    '/find',
    async (req, res) => {

      const params = {
        orderBy: req.body.orderBy || 'title',
        order: req.body.order || 'asc',
        query: req.body.query || '',
        page: req.body.page || 0,
        rowPerPage: req.body.rowPerPage || 10,
      }

      try {
        const rows = await electroCardApp(params);
        console.log(rows)
        res.status(201).json({ rows })
      }
      catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
      }
    })

module.exports = router;

