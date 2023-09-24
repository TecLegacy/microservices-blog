import express, { Response, Request, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.log(err);
    const formattedError = err.error.map(error => {
      if (error.type === 'field') {
        return {
          message: error.msg,
          field: error.path,
        };
      }
    });
    return res.status(400).send({
      error: formattedError,
    });
  }
  res.status(400).send({ message: err.message });
};
