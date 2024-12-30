"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hall = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const class_validator_1 = require("class-validator");
var UserSession;
(function (UserSession) {
    UserSession["Morning"] = "Morning";
    UserSession["Evening"] = "Evening";
})(UserSession || (UserSession = {}));
var UserFloor;
(function (UserFloor) {
    UserFloor["First"] = "First";
    UserFloor["Second"] = "Second";
})(UserFloor || (UserFloor = {}));
var UserCategory;
(function (UserCategory) {
    UserCategory["Premium"] = "Premium";
    UserCategory["Simple"] = "Simple";
})(UserCategory || (UserCategory = {}));
let Hall = class Hall extends sequelize_typescript_1.Model {
};
exports.Hall = Hall;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
], Hall.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.Min)(50, { message: "Minimum 50" }),
    (0, class_validator_1.Max)(150, { message: "Maximum 150" }),
    (0, class_validator_1.IsInt)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Hall.prototype, "capacity", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(UserSession, {
        message: 'Session must be either "Morning" or "Evening".'
    }),
    (0, class_validator_1.IsString)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(UserSession.Morning, UserSession.Evening),
        allowNull: false,
    })
], Hall.prototype, "session", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(UserFloor, {
        message: 'Floor must be either "First" or "Second".'
    }),
    (0, class_validator_1.IsString)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(UserFloor.First, UserFloor.Second),
        allowNull: false,
    })
], Hall.prototype, "floor", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(UserCategory, {
        message: 'Category must be either "Premium" or "Simple".'
    }),
    (0, class_validator_1.IsString)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(UserCategory.Premium, UserCategory.Simple),
        allowNull: false,
    })
], Hall.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Hall.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    })
], Hall.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "user_id",
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Hall.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "area_id",
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Hall.prototype, "areaId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "is_available",
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    })
], Hall.prototype, "isAvailable", void 0);
exports.Hall = Hall = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'hall_details',
        timestamps: true,
    })
], Hall);
