import { Router } from 'express';

// import { authMiddleware } from '../middlewares/authentication';
import userController from '../controllers/user.controller';
import jobController from '../controllers/job.controller';
import authController from '../controllers/auth.controller';
import avatarController from '../controllers/avatar.controller';
import candidateController from '../controllers/candidate.controller';
import recruiterController from '../controllers/recruiter.controller';
import curriculumController from '../controllers/curriculum.controller';

const router = Router();

router.use('/auth', authController.routes());
router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'API EM PÉ' });
});

// router.use(authMiddleware);

router.use('/users', userController.routes());
router.use('/users', avatarController.routes());
router.use('/jobs', jobController.routes());
router.use('/candidates', candidateController.routes());
router.use('/candidates', curriculumController.routes());
router.use('/recruiters', recruiterController.routes());

process.on('uncaughtException', err => {
  console.log(err);
});

export default router;
