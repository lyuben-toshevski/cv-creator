import express, { Request, Response } from 'express';
import { UniqueConstraintError } from 'sequelize';
import { AuthService } from '@source/services';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    await AuthService.registerUser(username, password);
    res.status(201).send('User registered');
  } catch (error: any) {
    if (error instanceof UniqueConstraintError) {
      res.status(400).json({
        message: 'Username already exists.',
      });
    } else {
      res.status(500).send('Error registering user');
    }
  }
});

export { router as registerRouter };
