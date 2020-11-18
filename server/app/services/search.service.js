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
const sequelize_1 = require("sequelize");
const ApiError_1 = require("../../middlewares/ApiError");
const candidate_model_1 = require("../models/candidate.model");
const curriculum_model_1 = require("../models/curriculum.model");
const user_model_1 = require("../models/user.model");
class SearchService {
    static index(search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield user_model_1.default.findAll({
                    include: [
                        {
                            model: candidate_model_1.default,
                            include: [{ model: curriculum_model_1.default }],
                            where: {
                                [sequelize_1.Op.or]: {
                                    profession: {
                                        [sequelize_1.Op.iLike]: `%${search}%`,
                                    },
                                    levelTraining: {
                                        [sequelize_1.Op.iLike]: `%${search}%`,
                                    },
                                },
                            },
                        },
                    ],
                });
                return posts;
            }
            catch (error) {
                throw new ApiError_1.ApiError(error, 500);
            }
        });
    }
}
exports.default = SearchService;
