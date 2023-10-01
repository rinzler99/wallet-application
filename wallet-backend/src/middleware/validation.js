const { body, validationResult } = require("express-validator");

exports.validateWalletSetup = [
  body("balance")
    .isFloat({ min: 0 })
    .withMessage("Balance must be a positive number with up to 4 decimal places"),
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Name is required and must be a non-empty string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
