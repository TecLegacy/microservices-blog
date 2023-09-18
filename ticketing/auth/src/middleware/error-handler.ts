import express, { Response, Request, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.log('w');
  }
  res.status(400).send({ message: err.message });
};
