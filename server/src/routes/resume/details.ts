import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/details', async (req: Request, res: Response) => {
  res.status(200).send('Your resume');
});

export { router as detailsRouter };
