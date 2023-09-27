export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(public loggingMessage?: string) {
    super(loggingMessage);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializedError(): {
    message: string;
    field?: string;
  }[];
}
