import express from 'express';
import { currentUser } from '../middleware/current-user';
// import { isAuthenticated } from '../middleware/require-auth';

const router = express.Router();

/**
 * GOAL - to Verify the cookie
 * send appropriate response
 */
router.get(
  '/api/users/currentuser',
  currentUser,
  // isAuthenticated,
  (req, res) => {
    console.log('from server', req.session);
    res.status(200).send({
      currentUser: req.currentUser || null,
    });
    // res.send({});
  }
);

export { router as currentUserRouter };
