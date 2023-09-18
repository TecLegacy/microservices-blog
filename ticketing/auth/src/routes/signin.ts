import express from 'express';
const router = express.Router();

/**
 * @ route POST /api/users/signin
 * @ desc Sign in a user
 * @ access Public
 * @ param email, password
 * @ return user
 */
router.post('/api/users/signin', (req, res) => {
  res.send('signin');
});

export { router as signinRouter };
