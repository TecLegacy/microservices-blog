import { ValidationError } from 'express-validator';
export class RequestValidationError extends Error {
  constructor(public error: ValidationError[]) {
    super();
    //Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  // serializeErrors() {
  //   return this.error.map(err => {
  //     return { message: err.msg, field: err.path };
  //   });
  // }
}
