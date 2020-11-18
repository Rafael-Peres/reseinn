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
const ApiError_1 = require("../../middlewares/ApiError");
const user_model_1 = require("../models/user.model");
class ChangePasswordService {
    static update(request, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findByPk(userId);
            const { currentPassword, newPassword, confirmation } = request;
            if (newPassword !== confirmation) {
                throw new ApiError_1.ApiError('As senhas não combinam.', 400);
            }
            const validate = yield bcryptjs.compare(currentPassword, user.password);
            if (!validate) {
                throw new ApiError_1.ApiError('Senha inválida.', 400);
            }
            user.password = yield bcryptjs.hash(newPassword, 8);
            yield user.save();
            return user;
        });
    }
}
exports.default = ChangePasswordService;
