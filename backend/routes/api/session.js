// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    // .notEmpty()
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

//Log in
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      res.status(401)
      return res.json({
        "message": "Invalid credentials",
        "statusCode": 401,
      });
    }

    const token = await setTokenCookie(res, user);

    const userData = user.toJSON()
    userData.token = token

    return res.json(
      userData
    );
  }
);

//Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user
// router.get(
//   '/',
//   restoreUser,
//   (req, res) => {
//     const { user } = req;
//     if (user) {
//       return res.json({ user: user.toSafeObject() });
//     } else return res.json({});
//   }
// );
router.get(
  '/',
  restoreUser,
  async (req, res) => {
  const { user } = req;
  const currentUser = await User.findByPk(user.id)

  if (user) {
      return res.json(currentUser);
  } else {
    res.status(401)
    return res.json({
      message: "Authentication required",
      statusCode: 401
    })
  };
});



module.exports = router;
