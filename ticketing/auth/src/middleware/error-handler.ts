import express, { Response, Request, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseValidationError } from '../errors/database-validation-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    res.status(err.statusCode).send({
      error: err.serializeErrors(),
    }); // const formattedError = err.error.map(error => {
    //   if (error.type === 'field') {
    //     return {
    //       message: error.msg,
    //       field: error.path,
    //     };
    //   }
    // });
    // return res.status(400).send({
    //   error: formattedError,
    // });
  }

  if (err instanceof DatabaseValidationError) {
    res.status(err.statusCode).send(err.serializeErrors());
  }

  res.status(400).send({ message: err.message });
};
