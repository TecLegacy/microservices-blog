import { body, validationResult } from 'express-validator';
import express, { NextFunction, Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseValidationError } from '../errors/database-validation-error';
const router = express.Router();
/**
 * @ route POST /api/users/signup
 * @ desc create a user
 * @ access Public
 * @ body email, password
 */
router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Enter valid email!'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);

    //Not Empty = true
    if (!error.isEmpty()) {
      const err = error.array();
      return next(new RequestValidationError(err));
    }

    throw next(new DatabaseValidationError());

    res.send('Hi there!');
  }
);

export { router as signupRouter };
