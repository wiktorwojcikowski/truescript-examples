import { Router } from 'express';
import JobsRouter from './Jobs';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/jobs', JobsRouter);

// Export the base-router
export default router;
