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
const user_model_1 = require("./user.model");
let Avatar = class Avatar extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column({ field: 'id' }),
    __metadata("design:type", Number)
], Avatar.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.ForeignKey(() => user_model_1.default),
    sequelize_typescript_1.Column({ field: 'user_id' }),
    __metadata("design:type", Number)
], Avatar.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => user_model_1.default),
    __metadata("design:type", user_model_1.default)
], Avatar.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Avatar.prototype, "filename", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Avatar.prototype, "extension", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Avatar.prototype, "path", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column({ field: 'created_at' }),
    __metadata("design:type", Date)
], Avatar.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column({ field: 'updated_at' }),
    __metadata("design:type", Date)
], Avatar.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    sequelize_typescript_1.Column({ field: 'deleted_at' }),
    __metadata("design:type", Date)
], Avatar.prototype, "deletedAt", void 0);
Avatar = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'avatars',
        underscored: true,
        timestamps: true,
    })
], Avatar);
exports.default = Avatar;
