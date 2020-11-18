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
const bcryptjs = require("bcryptjs");
const user_model_1 = require("../models/user.model");
const ApiError_1 = require("../../middlewares/ApiError");
const avatar_model_1 = require("../models/avatar.model");
const recruiter_model_1 = require("../models/recruiter.model");
const candidate_model_1 = require("../models/candidate.model");
class UserService {
    static index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.findAll({
                    include: [
                        { model: avatar_model_1.default },
                        { model: recruiter_model_1.default },
                        { model: candidate_model_1.default },
                    ],
                    attributes: { exclude: ['password'] },
                });
                return users;
            }
            catch (error) {
                throw new ApiError_1.ApiError(error, 500);
            }
        });
    }
    static show(id) {
        return user_model_1.default.findByPk(id, {
            include: [{ model: avatar_model_1.default }, { model: recruiter_model_1.default }, { model: candidate_model_1.default }],
            attributes: { exclude: ['password'] },
        });
    }
    static store(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (body.password) {
                body.password = yield this.hashPassword(body.password);
            }
            const user = yield user_model_1.default.create(Object.assign({}, body)).catch((error) => {
                throw new ApiError_1.ApiError(error, 400);
            });
            return user;
        });
    }
    static update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findByPk(id);
            if (!user) {
                throw new ApiError_1.ApiError('Usuário não localizado', 404);
            }
            if (body.password) {
                body.password = yield this.hashPassword(body.password);
            }
            yield user.update(Object.assign({}, body)).catch((error) => {
                throw new ApiError_1.ApiError(error, 400);
            });
            yield user.save();
            return user_model_1.default.findByPk(user.id, {
                include: [{ model: avatar_model_1.default }, { model: recruiter_model_1.default }, { model: candidate_model_1.default }],
                attributes: { exclude: ['password'] },
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findByPk(id);
            if (!user) {
                throw new ApiError_1.ApiError('Usuário não localizado para o ID informado', 404);
            }
            yield user.destroy({ force: true });
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    // eslint-disable-next-line consistent-return
    static hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (password) {
                // eslint-disable-next-line no-return-await
                return yield bcryptjs.hash(password, 8);
            }
        });
    }
}
exports.default = UserService;
