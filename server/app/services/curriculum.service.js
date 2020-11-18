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
const upload_service_1 = require("./upload.service");
const storage_service_1 = require("./storage.service");
const curriculum_model_1 = require("../models/curriculum.model");
class CurriculumService {
    static show(candidateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const curriculum = yield curriculum_model_1.default.findOne({ where: { candidateId } });
            if (!curriculum) {
                throw new ApiError_1.ApiError('Curriculo nao encontrado.', 404);
            }
            return curriculum;
        });
    }
    static store(body, candidateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const curriculumExists = yield curriculum_model_1.default.findOne({
                where: { candidateId },
            });
            if (curriculumExists) {
                throw new ApiError_1.ApiError('candidado ja possui curriculo cadastrado', 400);
            }
            const { file } = yield upload_service_1.default.store(body, 'Curriculum', {
                allowExtenstions: ['.docx', '.doc', '.pdf'],
                maxSize: 1024 * 2048,
            });
            const curriculum = yield curriculum_model_1.default.create({
                filename: file.filename,
                extension: file.originalname.substr(file.originalname.lastIndexOf('.')),
                path: `/Curriculum/${file.filename}`,
                candidateId,
            }).catch((error) => {
                throw new ApiError_1.ApiError(error, 400);
            });
            return curriculum.save();
        });
    }
    static update(candidateId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { file } = yield upload_service_1.default.store(body, 'Curriculum', {
                allowExtenstions: ['.docx', '.doc', '.pdf'],
                maxSize: 1024 * 2048,
            });
            const curriculum = yield curriculum_model_1.default.findOne({ where: { candidateId } });
            yield storage_service_1.default.remove(curriculum.path);
            yield curriculum
                .update({
                filename: file.filename,
                extension: file.originalname.slice(-4),
                path: `/Curriculum/${file.filename}`,
            })
                .catch((error) => {
                throw new ApiError_1.ApiError(error, 400);
            });
            return curriculum.save();
        });
    }
    static delete(candidateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const curriculum = yield curriculum_model_1.default.findOne({ where: { candidateId } });
            storage_service_1.default.remove(curriculum.path);
            return curriculum.destroy({ force: true });
        });
    }
}
exports.default = CurriculumService;
