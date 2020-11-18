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
class ForgotPasswordService {
    /**
     * reset the user password
     */
    static forgot(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, document, email } = request;
            const user = yield user_model_1.default.findOne({ where: { username } });
            if (!user) {
                throw new ApiError_1.ApiError('Usuário não existe', 404);
            }
            if (user.document !== document) {
                throw new ApiError_1.ApiError('Documento inválido', 400);
            }
            if (user.email !== email) {
                throw new ApiError_1.ApiError('E-mail inválido', 400);
            }
            const newPassword = user.email.slice(0, 3) + user.document.slice(0, 3);
            user.password = yield bcryptjs.hash(newPassword, 8);
            yield user.save();
            return { newPassword: newPassword.toLowerCase() };
        });
    }
}
exports.default = ForgotPasswordService;
