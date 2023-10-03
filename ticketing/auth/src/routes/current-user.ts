import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

/**
 * GOAL - to Verify the cookie
 * send appropriate response
 */
router.get('/api/users/currentuser', (req, res) => {
  // Check is cookie is valid & present
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);

    res.status(200).send({
      currentUser: payload,
    });
  } catch (err) {
    return res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
