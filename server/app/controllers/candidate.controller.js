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
const candidate_service_1 = require("../services/candidate.service");
exports.default = new (class CandidateController {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/', this.store);
        this.router.get('/', this.index);
        this.router.get('/:id', this.show);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
        this.router.put('/:id/associateJobs', this.associateJobs);
        return this.router;
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidates = yield candidate_service_1.default.index();
                res.status(200).json(candidates);
            }
            catch (error) {
                const { name: message, statusCode } = error;
                res.status(statusCode).json({ message });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const candidade = yield candidate_service_1.default.show(Number(id));
                res.status(200).json(candidade);
            }
            catch (error) {
                const { name: message, statusCode } = error;
                res.status(statusCode).json({ message });
            }
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidade = yield candidate_service_1.default.store(req.body);
                res.status(201).json(candidade);
            }
            catch (error) {
                const { name: message, statusCode } = error;
                res.status(statusCode).json({ message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const candidade = yield candidate_service_1.default.update(Number(id), req.body);
                res.status(200).json(candidade);
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
                const candidade = yield candidate_service_1.default.delete(Number(id));
                res.status(200).json({ candidade });
            }
            catch (error) {
                const { name: message, statusCode } = error;
                res.status(statusCode).json({ message });
            }
        });
    }
    associateJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { jobId } = req.body;
                const userAssociate = yield candidate_service_1.default.associateJobs(Number(id), jobId);
                res.status(200).json(userAssociate);
            }
            catch (error) {
                const { name: message, statusCode } = error;
                res.status(statusCode).json({ message });
            }
        });
    }
})();
