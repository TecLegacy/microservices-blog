import { FieldValidationError } from 'express-validator';
export class RequestValidationError extends Error {
  constructor(public error: FieldValidationError[]) {
    super();
    //Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.error.map(err => {
      return { message: err.msg, field: err.path };
    });
  }
}
