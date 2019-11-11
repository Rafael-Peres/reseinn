import { Router } from 'express';

import userController from '../controllers/user.controller';
import jobController from '../controllers/job.controller';

const router = Router();

router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'API EM PÉ' });
});

router.use('/users', userController.routes());
router.use('/jobs', jobController.routes());

process.on('uncaughtException', err => {
  console.log(err);
});

export default router;
