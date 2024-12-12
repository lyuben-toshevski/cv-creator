import express, { Request, Response } from 'express';
import { AuthService } from '@source/services';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const accessToken = await AuthService.loginUser(username, password);
    res.status(200).json({ accessToken });
  } catch (error: any) {
    if (error.message === 'Wrong credentials') {
      res.status(400).send(error.message);
    } else if (error.message === 'Unauthorized') {
      res.status(401).send(error.message);
    } else {
      res.status(500).send('Something went wrong');
    }
  }
});

export { router as loginRouter };
