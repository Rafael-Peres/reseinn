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
const avatar_model_1 = require("../models/avatar.model");
const ApiError_1 = require("../../middlewares/ApiError");
const upload_service_1 = require("./upload.service");
const storage_service_1 = require("./storage.service");
class AvatarService {
    static show(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const avatar = yield avatar_model_1.default.findOne({ where: { userId } });
            if (!avatar) {
                throw new ApiError_1.ApiError('Foto não encontrada.', 404);
            }
            return avatar;
        });
    }
    static store(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const avatarExists = yield avatar_model_1.default.findOne({ where: { userId } });
            if (avatarExists) {
                throw new ApiError_1.ApiError('usuário ja possui uma foto cadastrada', 400);
            }
            const { file } = yield upload_service_1.default.store(body, 'Avatar', {
                allowExtenstions: ['.png', '.jpg', '.jpeg'],
                maxSize: 1024 * 2048,
            });
            const avatar = yield avatar_model_1.default.create({
                filename: file.filename,
                extension: file.originalname.substr(file.originalname.lastIndexOf('.')),
                path: `/Avatar/${file.filename}`,
                userId,
            }).catch((error) => {
                throw new ApiError_1.ApiError(error, 400);
            });
            return avatar.save();
        });
    }
    static update(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { file } = yield upload_service_1.default.store(body, 'Avatar', {
                allowExtenstions: ['.png', '.jpg', '.jpeg'],
                maxSize: 1024 * 2048,
            });
            const avatar = yield avatar_model_1.default.findOne({ where: { userId } });
            yield storage_service_1.default.remove(avatar.path);
            yield avatar
                .update({
                filename: file.filename,
                extension: file.originalname.slice(-4),
                path: `/Avatar/${file.filename}`,
            })
                .catch((error) => {
                throw new ApiError_1.ApiError(error, 400);
            });
            return avatar.save();
        });
    }
    static delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const avatar = yield avatar_model_1.default.findOne({ where: { userId } });
            storage_service_1.default.remove(avatar.path);
            return avatar.destroy({ force: true });
        });
    }
}
exports.default = AvatarService;
