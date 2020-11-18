import { Router } from 'express';

// import { authMiddleware } from '../middlewares/authentication';
import userController from '../app/controllers/user.controller';
import jobController from '../app/controllers/job.controller';
import authController from '../app/controllers/auth.controller';
import avatarController from '../app/controllers/avatar.controller';
import candidateController from '../app/controllers/candidate.controller';
import recruiterController from '../app/controllers/recruiter.controller';
import curriculumController from '../app/controllers/curriculum.controller';
import searchController from '../app/controllers/search.controller';

const router = Router();

router.use('/auth', authController.routes());
router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'API EM PÉ' });
});

// router.use(authMiddleware);

router.use('/userss', avatarController.routes());
router.use('/users', userController.routes());
router.use('/jobs', jobController.routes());
router.use('/candidates', searchController.routes());
router.use('/candidates', candidateController.routes());
router.use('/candidates', curriculumController.routes());
router.use('/recruiters', recruiterController.routes());

process.on('uncaughtException', (err) => {
  console.log(err);
});

export default router;
