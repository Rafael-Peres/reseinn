"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { authMiddleware } from '../middlewares/authentication';
const user_controller_1 = require("../app/controllers/user.controller");
const job_controller_1 = require("../app/controllers/job.controller");
const auth_controller_1 = require("../app/controllers/auth.controller");
const avatar_controller_1 = require("../app/controllers/avatar.controller");
const candidate_controller_1 = require("../app/controllers/candidate.controller");
const recruiter_controller_1 = require("../app/controllers/recruiter.controller");
const curriculum_controller_1 = require("../app/controllers/curriculum.controller");
const search_controller_1 = require("../app/controllers/search.controller");
const router = express_1.Router();
router.use('/auth', auth_controller_1.default.routes());
router.get('/ping', (req, res) => {
    res.status(200).json({ message: 'API EM PÉ' });
});
// router.use(authMiddleware);
router.use('/userss', avatar_controller_1.default.routes());
router.use('/users', user_controller_1.default.routes());
router.use('/jobs', job_controller_1.default.routes());
router.use('/candidates', search_controller_1.default.routes());
router.use('/candidates', candidate_controller_1.default.routes());
router.use('/candidates', curriculum_controller_1.default.routes());
router.use('/recruiters', recruiter_controller_1.default.routes());
process.on('uncaughtException', (err) => {
    console.log(err);
});
exports.default = router;
