import express from 'express';

const router = express.Router();

/**
 * @ route POST /api/users/signout
 * @ desc Sign out a user
 * @ access Public
 * @ param email, password
 * @ return user
 */
router.get('/api/users/signout', (req, res) => {
  res.send('custom signout');
});

export { router as signoutRouter };
