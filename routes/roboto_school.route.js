const { Router } = require('express');
const router = Router();
const findSchoolStudentsApp = require('../methods/School/students/find');
const findSchoolLessonsApp = require('../methods/School/lessons/find');
const findSchoolCourcesApp = require('../methods/School/cources/find');
const infoSchoolCourcesApp = require('../methods/School/cources/info');
const findSchoolTeachersApp = require('../methods/School/teachers/find');
const createSchoolStudentsApp = require('../methods/School/students/create');
const createSchoolCourseApp = require('../methods/School/cources/create');
const createSchoolLessonApp = require('../methods/School/lessons/create');
const infoSchoolLessonsApp = require('../methods/School/lessons/info');
const confirmVisitApp = require('../methods/School/students/confirm/confirmVisit');
const confirmPaymentApp = require('../methods/School/students/confirm/confirmPayment');

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

router.post(
    '/students/create',
    async (req, res) => {
        const params = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            parent_firstName: req.body.parent_firstName,
            parent_lastName: req.body.parent_lastName,
        }
        console.log(params)
        try {
            await createSchoolStudentsApp(params);
            res.status(201).json({ message: 'Успешно создано' })
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    })
router.post(
    '/students/confirmVisit',
    async (req, res) => {
        const params = {
            lesson_id: req.body.lesson_id,
            student_id: req.body.student_id,
            courseId: req.body.courseId,
        }
        try {
            await confirmVisitApp(params);
            res.status(201).json({ message: 'Успешно обновлено' })
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    })
router.post(
    '/students/confirmPayment',
    async (req, res) => {
        const params = {
            lesson_id: req.body.lesson_id,
            student_id: req.body.student_id,
            courseId: req.body.courseId,
        }
        try {
            await confirmPaymentApp(params);
            res.status(201).json({ message: 'Успешно обновлено' })
        }
        catch (e) {
            console.log(e)
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
            query: req.query.query || '',
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
    '/lessons/info',
    async (req, res) => {
        const params = {
            orderBy: req.query.orderBy || 'title',
            order: req.query.order || 'asc',
            page: req.query.page || 0,
            rowPerPage: req.query.rowPerPage || 10,
            query: req.query.query || '',
            course_id: req.query.courseId,
            lesson_id: req.query.lessonId,
        }

        try {
            const { rows, count, info } = await infoSchoolLessonsApp(params);
            console.log('resRows', rows)
            res.status(201).json({ rows, count, info })
        }
        catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    })

router.post(
    '/lessons/create',
    async (req, res) => {
        console.log('LIMIT' + JSON.stringify(req.query))
        const params = {
            course_id: req.body.course_id,
            date: req.body.date,
            lesson_name: req.body.lesson_name,
            teacher_id: req.body.teacher_id
        }

        try {
            await createSchoolLessonApp(params);
            res.status(201).json({ message: 'Успешно создано' })
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
            orderBy: req.query.orderBy || 'course_id',
            order: req.query.order || 'asc',
            page: req.query.page || 0,
            query: req.query.query || '',
            rowPerPage: req.query.rowPerPage || 10,
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
    '/cources/info/:id',
    async (req, res) => {
        console.log('LIMIT' + JSON.stringify(req.query))
        const params = {
            orderBy: req.query.orderBy || 'course_id',
            order: req.query.order || 'asc',
            page: req.query.page || 0,
            query: req.query.query || '',
            rowPerPage: req.query.rowPerPage || 10,
            courseId: req.params.id,
        }

        try {
            const { rows, count, info } = await infoSchoolCourcesApp(params);
            console.log('resRows', rows)
            res.status(201).json({ rows, count, info })
        }
        catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    })

router.post(
    '/cources/create',
    async (req, res) => {
        console.log('LIMIT' + JSON.stringify(req.query))
        const params = {
            course_name: req.body.course_name,
            price: req.body.price,
            lesson_count: req.body.lesson_count,
            date_start: req.body.date_start,
            date_end: req.body.date_end,
        }

        try {
            await createSchoolCourseApp(params);
            res.status(201).json({ message: 'Успешно создано' })
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

