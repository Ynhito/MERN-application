const { Router } = require('express');
const router = Router();
const findSchoolAccountsApp = require('../methods/School/accounts/find');
const findSchoolStudentsApp = require('../methods/School/students/find');
const findSchoolLessonsApp = require('../methods/School/lessons/find');
const findSchoolCourcesApp = require('../methods/School/cources/cources');
const findSchoolTeachersApp = require('../methods/School/teachers/find');

router.get(
    '/students/find',
    async (req, res) => {
        console.log('LIMIT' + JSON.stringify(req.query))
        const params = {
            orderBy: req.query.orderBy || 'fio',
            order: req.query.order || 'asc',
            query: req.query.query || '',
            page: req.query.page || 0,
            rowPerPage: req.query.rowPerPage || 10,
        }

        try {
            const { rows, count } = await findSchoolStudentsApp(params);
            console.log('resRows', rows)
            res.status(201).json({ rows, count })
        }
        catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    })

router.get(
    '/accounts/find',
    async (req, res) => {
        console.log('LIMIT' + JSON.stringify(req.query))
        const params = {
            orderBy: req.query.orderBy || 'fio',
            order: req.query.order || 'asc',
            page: req.query.page || 0,
            rowPerPage: req.query.rowPerPage || 10,
            accountId: req.query.accountId,
        }

        try {
            const { rows, count } = await findSchoolAccountsApp(params);
            console.log('resRows', rows)
            res.status(201).json({ rows, count })
        }
        catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    })

router.get(
    '/lessons/find',
    async (req, res) => {
        console.log('LIMIT' + JSON.stringify(req.query))
        const params = {
            orderBy: req.query.orderBy || 'title',
            order: req.query.order || 'asc',
            page: req.query.page || 0,
            rowPerPage: req.query.rowPerPage || 10,
            lessonId: req.query.lessonId,
        }

        try {
            const { rows, count } = await findSchoolLessonsApp(params);
            console.log('resRows', rows)
            res.status(201).json({ rows, count })
        }
        catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    })

router.get(
    '/cources/find',
    async (req, res) => {
        console.log('LIMIT' + JSON.stringify(req.query))
        const params = {
            orderBy: req.query.orderBy || 'title',
            order: req.query.order || 'asc',
            page: req.query.page || 0,
            query: req.query.query || '',
            rowPerPage: req.query.rowPerPage || 10,
            courseId: req.query.courseId,
        }

        try {
            const { rows, count } = await findSchoolCourcesApp(params);
            console.log('resRows', rows)
            res.status(201).json({ rows, count })
        }
        catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    })

router.get(
    '/teachers/find',
    async (req, res) => {
        console.log('LIMIT' + JSON.stringify(req.query))
        const params = {
            orderBy: req.query.orderBy || 'title',
            order: req.query.order || 'asc',
            page: req.query.page || 0,
            query: req.query.query || '',
            rowPerPage: req.query.rowPerPage || 10,
            teacherId: req.query.teacherId,
        }

        try {
            const { rows, count } = await findSchoolTeachersApp(params);
            console.log('resRows', rows)
            res.status(201).json({ rows, count })
        }
        catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    })

module.exports = router;

