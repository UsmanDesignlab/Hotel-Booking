"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const class_validator_1 = require("class-validator");
var UserRole;
(function (UserRole) {
    UserRole["Owner"] = "Owner";
    UserRole["Client"] = "Client";
})(UserRole || (UserRole = {}));
let Users = class Users extends sequelize_typescript_1.Model {
};
exports.Users = Users;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
], Users.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], Users.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
    })
], Users.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Min)(3),
    (0, class_validator_1.Max)(6),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], Users.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(UserRole),
    (0, class_validator_1.IsString)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(UserRole.Owner, UserRole.Client),
        allowNull: true,
    })
], Users.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(11),
    (0, class_validator_1.Max)(11),
    (0, class_validator_1.IsOptional)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], Users.prototype, "phoneNumber", void 0);
exports.Users = Users = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'user',
        timestamps: true,
    })
], Users);
