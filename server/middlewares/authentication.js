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
exports.authMiddleware = void 0;
const jwt = require("jsonwebtoken");
const user_model_1 = require("../app/models/user.model");
// eslint-disable-next-line import/prefer-default-export
exports.authMiddleware = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: 'Nenhum token informado' });
            return;
        }
        const [, token] = authHeader.split(' ');
        jwt.verify(token, '6d28bf37110eb766d1e5f5a93a7bb1fe', (err, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                res.status(401).json({ message: err.message });
                return;
            }
            // eslint-disable-next-line dot-notation
            req['user'] = decoded;
            const user = yield user_model_1.default.findByPk(decoded.userId);
            if (!user) {
                res.status(401).json({ message: 'Usuário inexistente' });
                return;
            }
            next();
        }));
    });
};
