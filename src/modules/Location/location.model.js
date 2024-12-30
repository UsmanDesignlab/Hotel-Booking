"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const class_validator_1 = require("class-validator");
let Location = class Location extends sequelize_typescript_1.Model {
};
exports.Location = Location;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
], Location.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], Location.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, sequelize_typescript_1.Column)({
        field: "hotel_id",
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Location.prototype, "hotelId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "user_id",
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Location.prototype, "userId", void 0);
exports.Location = Location = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'location',
        timestamps: true,
    })
], Location);
