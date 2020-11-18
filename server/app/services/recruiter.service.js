"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../../middlewares/ApiError");
const recruiter_model_1 = require("../models/recruiter.model");
const job_model_1 = require("../models/job.model");
const user_model_1 = require("../models/user.model");
class RecruiterService {
    static index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recruiters = yield recruiter_model_1.default.findAll({
                    include: [{ model: user_model_1.default }],
                });
                return recruiters;
            }
            catch (error) {
                throw new ApiError_1.ApiError(error, 500);
            }
        });
    }
    static show(id) {
        return recruiter_model_1.default.findByPk(id, { include: [{ model: user_model_1.default }] });
    }
    static store(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const recruiter = yield recruiter_model_1.default.create(Object.assign({}, body)).catch((error) => {
                throw new ApiError_1.ApiError(error, 400);
            });
            return recruiter;
        });
    }
    static update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const recruiter = yield recruiter_model_1.default.findByPk(id);
            if (!recruiter) {
                throw new ApiError_1.ApiError('Usuário não localizado', 404);
            }
            yield recruiter.update(Object.assign({}, body)).catch((error) => {
                throw new ApiError_1.ApiError(error, 400);
            });
            yield recruiter.save();
            return recruiter_model_1.default.findByPk(recruiter.id, {});
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const recruiter = yield recruiter_model_1.default.findByPk(id);
            if (!recruiter) {
                throw new ApiError_1.ApiError('Usuário não localizado para o ID informado', 404);
            }
            yield recruiter.destroy({ force: true });
        });
    }
    static associateJobs(recruiterId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const recruiter = yield recruiter_model_1.default.findByPk(recruiterId);
            const job = yield job_model_1.default.findByPk(jobId);
            if (job) {
                throw new ApiError_1.ApiError('Vagas não localizadas para os IDS informados', 404);
            }
            yield recruiter.$set('jobs', job);
            return recruiter_model_1.default.findByPk(recruiterId, {
                include: [{ model: job_model_1.default }],
            });
        });
    }
}
exports.default = RecruiterService;
