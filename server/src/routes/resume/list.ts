import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/list', async (req: Request, res: Response) => {
  res.status(400).json({
    data: ['resume 1', 'resume 2'],
    message: 'Username already exists.',
  });
});

export { router as listRouter };
