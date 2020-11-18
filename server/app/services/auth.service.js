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
const jwt = require("jsonwebtoken");
const ApiError_1 = require("../../middlewares/ApiError");
const user_model_1 = require("../models/user.model");
class AuthService {
    static login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = body;
            const user = yield user_model_1.default.findOne({
                where: { email },
            });
            if (!user) {
                throw new ApiError_1.ApiError('Usuário não localizado.', 404);
            }
            const validate = yield bcryptjs.compare(password, user.password);
            if (!validate) {
                throw new ApiError_1.ApiError('Senha inválida.', 400);
            }
            const token = this.getToken(user);
            return {
                user: Object.assign(Object.assign({}, user.toJSON()), { password: undefined }),
                token,
            };
        });
    }
    static getToken(user) {
        try {
            const token = jwt.sign({
                userId: user.id,
            }, '6d28bf37110eb766d1e5f5a93a7bb1fe', { expiresIn: '1d' });
            return token;
        }
        catch (error) {
            console.log(error);
            throw new ApiError_1.ApiError('Não foi possível gerar o token', 500);
        }
    }
}
exports.default = AuthService;
