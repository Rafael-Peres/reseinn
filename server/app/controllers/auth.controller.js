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
const express_1 = require("express");
const auth_service_1 = require("../services/auth.service");
const forgot_password_service_1 = require("../services/forgot_password.service");
exports.default = new (class AuthController {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/login', this.login);
        this.router.post('/forgot', this.forgot);
        return this.router;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const login = yield auth_service_1.default.login(req.body);
                res.status(200).json(login);
            }
            catch (error) {
                const { name: message, statusCode } = error;
                res.status(statusCode || 500).json({ message });
            }
        });
    }
    forgot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userPassword = yield forgot_password_service_1.default.forgot(req.body);
                res.status(200).json(userPassword);
            }
            catch (error) {
                const { name: message, statusCode } = error;
                res.status(statusCode).json({ message });
            }
        });
    }
})();
