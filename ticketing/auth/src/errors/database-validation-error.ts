export class DatabaseValidationError extends Error {
  statusCode = 500;
  reason = 'Connection to data-base failed!';
  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseValidationError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
