import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';

import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();
/**
 * @ route POST /api/users/signup
 * @ desc create a user
 * @ access Public
 * @ body email, password
 */
router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be Valid!'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  async (req: Request, res: Response) => {
    const error = validationResult(req);
    const { email, password } = req.body;

    //Not Empty = true
    if (!error.isEmpty()) {
      const err = error.array();
      throw new RequestValidationError(err);
    }

    // Check if user already Existed
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('User Already Exists');
    }

    const user = User.build({
      email,
      password,
    });

    await user.save();

    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      `MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDHVZDl3wYq9GN6
      2zC8ddutNfnnR/mI9ymHtLmrsn/V2HP0kKj9PKBB9htmJhkx8SLy4eO60O5Cs+Xs
      aMZ7eROW4OJzPXl/Fhk3Rr0NJkcvqDI/NcT9W+wowzXWQD28ZTuAmS2JcLTdZnVS
      DMIfQddaVv5QYgTCEvCBCAnZ/RZZf3JQ6i80tU9hPh5Vtv/yWNUJ6/hedwlcO88p
      +vXsHY6q2GgE6EVoOkFTRuGWjx0nMH2qub4FJPdfFgR8l6i9sr56KAv9/sqiZcCm
      XeO5OsrtOYzrCStaoRDcJlQi+M0wPOcJSVEABrYDeQC/YCiEvSYIZ/dWyBJfGH3f
      XHiA7i0PAgMBAAECggEAOTBU5oaCe/9qrRxG0sMTmBHE1XSiZIfY2+zfWiHXqFA2
      EGQSf7kNl28W9EsY7mmq57kkP3xi5zM604VJ8LHPi3mQrpRkD7CU4nWClsu1H7in
      VdhE4JWnXxiGkSYUMEFw/Ve1J1n1IhIbtcMgTJx0vx/3TbOZft61LqfSP77rUxiJ
      pvhwfRFFHJvh7iSblke0Dh41aGrjSyfFLy6FmnyzW7ndyQCFKsuGuuxBSn8qTz+8
      2NFeb1mFII8Rp+Z+nkvqdQbCH1C0JM3bGIqo2oqC+MakebX3AZJobEUg2p+foRPv
      puw819kdR3K30qYbR8K52vTHjBSHHqdfs0zXTeKBfQKBgQDLJawZPCzchnI3lHuo
      VJOpT5PopAKdv0dIlgKNkVrpVinqirIE88UqxlaCq5wi2+rjcX43UGdFhHjW2xvf
      64Dm1gh6xGixnw7p/wr5LfBO/b51wjGoKaVGR1X2BsQltMzM1zNqzGPhp6VgiIKZ
      d26Vw9PHHllECdtt+bkCAk61PQKBgQD7MfChI3xH8PETwnFrMk0nrEocv+PYKOey
      DxAKLZE7RPB54oASNp8LAyj3XuPaldr5Pk0e02cvGyP+PlQme6KyBCl9obRGwNQz
      sA+2gsbG9wkkLzpqzlXxzCi4ynXTqSnn7iIu7tiE9fNtYjzYhzzh8yo1H7MlEq/9
      daxb5qqIOwKBgQCRYjaWIMCiWf2n1TXiNBUxGGhsF+RfbKLhSaouEpaTYzzAQ94/
      OQ4kHKmQ/qvRLr4dY/3GLF6cG8A3U7vRNsObcBXFdobOh1yvDf2WctAGWAZUVFQh
      WxyS/T6BwjniGlBvUJvVlMzuk4IBYfDFT/nuaKVJXWjZDozhWdSToX8eqQKBgQDy
      mwkMmHkwAkTUELf6EFr0NjJeEfa8jsU389RKADiERdD75wZKkPaKbELkp4DpXFJg
      5wsU+phtpojcxNYBVOeNhveLnuG+c/5+7Uw/uY7CG1V43SROg3n+TnAGCYRDKN6Q
      Yi4hpgz4XZL90iNx/SuQDop1RGiBJctTwJL3L5EEgQKBgQCl9oubzigknMZJPshe
      vim8/rVvei0iQ6TpcXOXZKQ02auWDRjZzT/yk/0EKPmenloBAyMq3tZAGeHhXUCL
      VWYf6uK7hQJIait+wsrEyJ5iHTRHi+yWF1+wZet9uCRsDxJ0uKQlqoqzfI+KwAgv
      obWG4KVoVBQnlU4jtF2+dUvJjg==`
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
