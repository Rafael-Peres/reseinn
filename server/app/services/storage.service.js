"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const ApiError_1 = require("../../middlewares/ApiError");
class StorageService {
    static remove(path) {
        try {
            return fs.unlinkSync(`./storage${path}`);
        }
        catch (error) {
            throw new ApiError_1.ApiError('Não é posssivel encontrar o arquivo', 404);
        }
    }
}
exports.default = StorageService;
