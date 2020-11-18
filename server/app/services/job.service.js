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
const job_model_1 = require("../models/job.model");
class JobService {
    static index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobs = yield job_model_1.default.findAll({});
                return jobs;
            }
            catch (error) {
                throw new ApiError_1.ApiError(error, 500);
            }
        });
    }
    static show(id) {
        return job_model_1.default.findByPk(id, {});
    }
    static store(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield job_model_1.default.create(Object.assign({}, body)).catch((error) => {
                throw new ApiError_1.ApiError(error, 400);
            });
            return job;
        });
    }
    static update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield job_model_1.default.findByPk(id);
            if (!job) {
                throw new ApiError_1.ApiError('Vaga não localizada', 404);
            }
            yield job.update(Object.assign({}, body)).catch((error) => {
                throw new ApiError_1.ApiError(error, 400);
            });
            yield job.save();
            return job_model_1.default.findByPk(job.id);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield job_model_1.default.findByPk(id);
            if (!job) {
                throw new ApiError_1.ApiError('Vaga não localizada para o ID informado', 404);
            }
            yield job.destroy({ force: true });
        });
    }
}
exports.default = JobService;
