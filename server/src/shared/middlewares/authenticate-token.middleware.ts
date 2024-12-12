import { AuthenticatedRequest } from '@shared/types';
import { SECRETS } from '@source/secrets';
import { NextFunction, Response } from 'express';

import jwt from 'jsonwebtoken';

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.get('authorization');

  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, SECRETS.JWT_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    req.user = user;
    next();
  });
};
