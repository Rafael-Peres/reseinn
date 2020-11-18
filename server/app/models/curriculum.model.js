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
const candidate_model_1 = require("./candidate.model");
let Curriculum = class Curriculum extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column({ field: 'id' }),
    __metadata("design:type", Number)
], Curriculum.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.ForeignKey(() => candidate_model_1.default),
    sequelize_typescript_1.Column({ field: 'candidate_id' }),
    __metadata("design:type", Number)
], Curriculum.prototype, "candidateId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => candidate_model_1.default),
    __metadata("design:type", candidate_model_1.default)
], Curriculum.prototype, "candidate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Curriculum.prototype, "filename", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Curriculum.prototype, "extension", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Curriculum.prototype, "path", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column({ field: 'created_at' }),
    __metadata("design:type", Date)
], Curriculum.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column({ field: 'updated_at' }),
    __metadata("design:type", Date)
], Curriculum.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    sequelize_typescript_1.Column({ field: 'deleted_at' }),
    __metadata("design:type", Date)
], Curriculum.prototype, "deletedAt", void 0);
Curriculum = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'curriculums',
        underscored: true,
        timestamps: true,
    })
], Curriculum);
exports.default = Curriculum;
