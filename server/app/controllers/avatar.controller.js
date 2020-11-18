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
const avatar_service_1 = require("../services/avatar.service");
exports.default = new (class AvatarController {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/:id/avatar', this.uploadFile);
        this.router.get('/:id/avatar', this.show);
        this.router.put('/:id/avatar', this.updateFile);
        this.router.delete('/:id/avatar', this.delete);
        return this.router;
    }
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const avatar = yield avatar_service_1.default.store(req, Number(id));
                res.status(201).json(avatar);
            }
            catch (error) {
                console.log(error);
                const { name: message, statusCode } = error;
                res.status(statusCode).json({ message });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield avatar_service_1.default.show(Number(id));
                res.status(200).json(user);
            }
            catch (error) {
                const { name: message, statusCode } = error;
                res.status(statusCode).json({ message });
            }
        });
    }
    updateFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield avatar_service_1.default.update(Number(id), req);
                res.status(200).json(user);
            }
            catch (error) {
                const { name: message, statusCode } = error;
                res.status(statusCode).json({ message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield avatar_service_1.default.delete(Number(id));
                res.status(200).json({ user });
            }
            catch (error) {
                const { name: message, statusCode } = error;
                res.status(statusCode).json({ message });
            }
        });
    }
})();
