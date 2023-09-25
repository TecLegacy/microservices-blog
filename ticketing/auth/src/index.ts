import express, { NextFunction } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
// import { signinRouter } from '@routes/signin';

import { errorHandler } from './middleware/error-handler';

import { NotFoundError } from './errors/not-found-error';
const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', (_, __, next: NextFunction) => {
  // next(new NotFoundError());
  throw new NotFoundError();
});

//Middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server running on port 3000!!');
});
