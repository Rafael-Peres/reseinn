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
const multer = require("multer");
const faker = require("faker");
const fs = require("fs");
const path_1 = require("path");
const ApiError_1 = require("../../middlewares/ApiError");
class UploadService {
    static store(request, path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.verifyFolder(path);
            const storage = multer.diskStorage({
                destination(req, file, cb) {
                    cb(null, `./storage/${path}`);
                },
                filename(req, file, cb) {
                    cb(null, faker.random.uuid() +
                        file.originalname
                            .substr(file.originalname.lastIndexOf('.'))
                            .toLowerCase());
                },
            });
            const multerSingle = multer({
                storage,
                limits: { fileSize: options.maxSize ? options.maxSize : 1024 * 2048 },
                fileFilter: (req, file, cb) => {
                    if (options.allowExtenstions) {
                        const allowExtentions = [...options.allowExtenstions];
                        if (allowExtentions.includes(file.originalname
                            .substr(file.originalname.lastIndexOf('.'))
                            .toLowerCase())
                        // eslint-disable-next-line no-empty
                        ) {
                        }
                        else {
                            const erro = new Error();
                            erro.message = 'Extensão não permitida';
                            cb(null, false);
                        }
                    }
                    cb(null, true);
                },
            }).single('file');
            // eslint-disable-next-line no-shadow
            return new Promise((resolve, reject) => {
                multerSingle(request, undefined, (error) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        reject(new ApiError_1.ApiError(error.message, 400));
                    }
                    resolve(request);
                }));
            });
        });
    }
    static verifyFolder(path) {
        return __awaiter(this, void 0, void 0, function* () {
            fs.readdirSync(path_1.resolve(__dirname, '..', '..', '..', 'storage', path));
        });
    }
}
exports.default = UploadService;
