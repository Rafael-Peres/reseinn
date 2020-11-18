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
const avatar_model_1 = require("./avatar.model");
const candidate_model_1 = require("./candidate.model");
const recruiter_model_1 = require("./recruiter.model");
const gender_enum_1 = require("../../enums/gender.enum");
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column({ field: 'id' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.ForeignKey(() => candidate_model_1.default),
    sequelize_typescript_1.Column({ field: 'candidate_id' }),
    __metadata("design:type", Number)
], User.prototype, "candidateId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => candidate_model_1.default),
    __metadata("design:type", candidate_model_1.default)
], User.prototype, "candidate", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.ForeignKey(() => recruiter_model_1.default),
    sequelize_typescript_1.Column({ field: 'recruiter_id' }),
    __metadata("design:type", Number)
], User.prototype, "recruiterId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => recruiter_model_1.default),
    __metadata("design:type", recruiter_model_1.default)
], User.prototype, "recruiter", void 0);
__decorate([
    sequelize_typescript_1.HasOne(() => avatar_model_1.default),
    __metadata("design:type", avatar_model_1.default)
], User.prototype, "avatar", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Column({ field: 'full_name' }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "document", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.ENUM(gender_enum_1.Gender.Female, gender_enum_1.Gender.Male, gender_enum_1.Gender.Others)),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], User.prototype, "birthDate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "state", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column({ field: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column({ field: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    sequelize_typescript_1.Column({ field: 'deleted_at' }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
User = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'users',
        underscored: true,
        timestamps: true,
    })
], User);
exports.default = User;
