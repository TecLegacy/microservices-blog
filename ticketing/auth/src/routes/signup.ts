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
    body('email').isEmail().withMessage('Email must be Valid!'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  async (req: Request, res: Response) => {
    const error = validationResult(req);

    //Not Empty = true
    if (!error.isEmpty()) {
      const err = error.array();
      throw new RequestValidationError(err);
    }

    // throw new DatabaseValidationError('for logs');

    res.send('Hi there!');
  }
);

export { router as signupRouter };
