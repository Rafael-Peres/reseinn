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
const curriculum_model_1 = require("../models/curriculum.model");
const candidate_model_1 = require("../models/candidate.model");
const job_model_1 = require("../models/job.model");
const user_model_1 = require("../models/user.model");
class CandidateService {
    static index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidates = yield candidate_model_1.default.findAll({
                    include: [{ model: curriculum_model_1.default }, { model: user_model_1.default }],
                });
                return candidates;
            }
            catch (error) {
                throw new ApiError_1.ApiError(error, 500);
            }
        });
    }
    static show(id) {
        return candidate_model_1.default.findByPk(id, {
            include: [{ model: curriculum_model_1.default }, { model: user_model_1.default }, { model: job_model_1.default }],
        });
    }
    static store(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield candidate_model_1.default.create(Object.assign({}, body)).catch((error) => {
                throw new ApiError_1.ApiError(error, 400);
            });
            return candidate;
        });
    }
    static update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield candidate_model_1.default.findByPk(id);
            if (!candidate) {
                throw new ApiError_1.ApiError('Candidato não localizado', 404);
            }
            yield candidate.update(Object.assign({}, body)).catch((error) => {
                throw new ApiError_1.ApiError(error, 400);
            });
            yield candidate.save();
            return candidate_model_1.default.findByPk(candidate.id, {
                include: [{ model: curriculum_model_1.default }],
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield candidate_model_1.default.findByPk(id);
            if (!candidate) {
                throw new ApiError_1.ApiError('Candidato não localizado para o ID informado', 404);
            }
            yield candidate.destroy({ force: true });
        });
    }
    static associateJobs(candidateId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield candidate_model_1.default.findByPk(candidateId);
            const job = yield job_model_1.default.findByPk(jobId);
            if (!job) {
                throw new ApiError_1.ApiError('Vagas não localizadas para os IDS informados', 404);
            }
            yield candidate.$add('jobs', job);
            return yield candidate_model_1.default.findByPk(candidateId, {
                include: [{ model: job_model_1.default }],
            });
        });
    }
}
exports.default = CandidateService;
