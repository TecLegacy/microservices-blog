import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
const router = express.Router();

/**
 * @ route POST /api/users/signin
 * @ desc Sign in a user
 * @ access Public
 * @ param email, password
 * @ return user
 */

export { router as signinRouter };
