"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const job_recruiter_model_1 = require("./job-recruiter.model");
const job_model_1 = require("./job.model");
const user_model_1 = require("./user.model");
let Recruiter = class Recruiter extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column({ field: 'id' }),
    __metadata("design:type", Number)
], Recruiter.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => job_model_1.default, () => job_recruiter_model_1.default),
    __metadata("design:type", Array)
], Recruiter.prototype, "jobs", void 0);
__decorate([
    sequelize_typescript_1.HasOne(() => user_model_1.default),
    __metadata("design:type", user_model_1.default)
], Recruiter.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.Column({ field: 'presentation_letter' }),
    __metadata("design:type", String)
], Recruiter.prototype, "presentationLetter", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column({ field: 'created_at' }),
    __metadata("design:type", Date)
], Recruiter.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column({ field: 'updated_at' }),
    __metadata("design:type", Date)
], Recruiter.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    sequelize_typescript_1.Column({ field: 'deleted_at' }),
    __metadata("design:type", Date)
], Recruiter.prototype, "deletedAt", void 0);
Recruiter = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'recruiters',
        underscored: true,
        timestamps: true,
    })
], Recruiter);
exports.default = Recruiter;
