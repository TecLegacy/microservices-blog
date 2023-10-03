// import { Request } from 'express';
import { UserPayload } from '../middleware/current-user';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
