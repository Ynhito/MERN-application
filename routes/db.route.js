const {Router} = require('express');
const router = Router();
const electroCardApp = require('../methods/Electrocars/find');

router.get(
    '/find',
    async (req, res) => {
      console.log('LIMIT' + JSON.stringify(req.query))
      const params = {
        orderBy: req.query.orderBy || 'title',
        order: req.query.order || 'asc',
        query: req.query.query || '',
        page: req.query.page || 0,
        rowPerPage: req.query.rowPerPage || 10,
      }

      try {
        const {rows, count} = await electroCardApp(params);
        console.log('resRows', rows)
        res.status(201).json({ rows, count })
      }
      catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
      }
    })

module.exports = router;

