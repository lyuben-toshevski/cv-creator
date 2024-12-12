import express from 'express';
import { authRouter } from './auth';
import { resumeRouter } from './resume';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/resume', resumeRouter);

export { router as gatewayRouter };
