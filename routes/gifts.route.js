const { Router } = require('express');
const mysqlLib = require('../@libs/mysql.lib');

const router = Router();

router.get(
    '/find',
    async (req, res) => {
        try {
            const rows = await mysqlLib.executeQuery('SELECT * FROM gifts');
            res.status(201).json({ rows })
        }
        catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    })

router.get(
    '/get/:id',
    async (req, res) => {
        try {
            const {id} = req.params;

            const gift = await (await mysqlLib.executeQuery('SELECT * FROM gifts WHERE id=?', [id]))[0];
            res.status(201).json({ gift });
        }
        catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    })

router.post(
    '/create',
    async (req, res) => {
        try {
            connection.query("SELECT * FROM electrocars", function (err, rows, fields) {
                if (err) return console.log(err);
                res.status(201).json({ rows: rows, fields: fields })
            });

        }
        catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    })
module.exports = router;