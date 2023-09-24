import { body, validationResult } from 'express-validator';
import express, { NextFunction, Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
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
  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);

    //Not Empty = true
    if (!error.isEmpty()) {
      console.log(error.array());
      const err = error.array();
      console.log(typeof err);

      // console.log(data);
      // return next(data[0].msg);
      // return next(new Error('Invalid email or password'));
      // return res.status(400).send(error.array());

      return next(new RequestValidationError(err));
    }

    throw new Error('Error connecting to database');
    console.log('Creating a user...');

    res.send('Hi there!');
  }
);

export { router as signupRouter };
