import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

/**
 *
 * @param req  session.jwt to req.currentUser
 * @param next check if user is authenticated
 */

export interface UserPayload {
  id: string;
  email: string;
}

const currentUser = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    // Pass it to auth middleware
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  return next();
};

export { currentUser };
