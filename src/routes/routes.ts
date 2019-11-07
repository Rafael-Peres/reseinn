import { Router } from 'express';

const router = Router();

router.use('/users', (req, res) => {});
router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'API EM PÉ' });
});

export default router;
