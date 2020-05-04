const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CONFIG = require('config');
const { check, validationResult } = require('express-validator');
const mysqlLib = require('../@libs/mysql.lib');

const router = Router();

router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      console.log('Body:', req.body)
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
      }

      const { email, password } = req.body;

      const rows = await mysqlLib.executeQuery("SELECT * FROM пользователи WHERE Email=?", [email]);
      if (rows.length > 0) {
        res.status(400).json({ message: 'Такой пользователь уже существует!' })
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await mysqlLib.executeQuery("INSERT INTO пользователи (Email, Пароль) VALUES (?,?)", [email, hashedPassword]);

      res.status(201).json({ message: 'Пользователь создан' })

    }
    catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так' })
    }
  })

router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему'
        })
      }
      const { email, password } = req.body;

      const user = await (await mysqlLib.executeQuery("SELECT * FROM пользователи WHERE Email=?", [email]))[0];

      if (!user) {
        res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = await bcrypt.compare(password, user['Пароль']);

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }

      const token = jwt.sign(
        { userId: user['Номер телефона'] },
        CONFIG.get('jwtSecret'),
        { expiresIn: '1h' }
      )

        res.json({ token, userId: user['Номер телефона'] })

    }
    catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так' })
    }
  })

module.exports = router;