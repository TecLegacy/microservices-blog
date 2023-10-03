import express from 'express';
import { currentUser } from '../middleware/current-user';

const router = express.Router();

/**
 * GOAL - to Verify the cookie
 * send appropriate response
 */
router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.status(200).send({
    currentUser: req.currentUser || null,
  });
});

export { router as currentUserRouter };
