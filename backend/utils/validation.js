// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    // const errorMessage = Object.assign({},errors)

    // delete errorMessage[key];
    res.status(400)
    res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": errors
    })

    // const err = Error('Bad request.');
    // err.errors = errors;
    // err.status = 400;
    // err.title = 'Bad request.';
    // next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};
