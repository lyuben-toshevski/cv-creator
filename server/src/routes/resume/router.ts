import express from 'express';
import { detailsRouter } from './details';
import { listRouter } from './list';

const router = express.Router();

router.use(detailsRouter);
router.use(listRouter);

export { router as resumeRouter };
