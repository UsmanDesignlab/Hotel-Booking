"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelBooking = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const class_validator_1 = require("class-validator");
let hotelBooking = class hotelBooking extends sequelize_typescript_1.Model {
};
exports.hotelBooking = hotelBooking;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    })
], hotelBooking.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    })
], hotelBooking.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(11),
    (0, class_validator_1.Max)(11),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    })
], hotelBooking.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsString)(),
    (0, sequelize_typescript_1.Column)({
        field: "booking_Date",
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    })
], hotelBooking.prototype, "bookingDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "hall_Id",
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], hotelBooking.prototype, "hallId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "user_Id",
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], hotelBooking.prototype, "userId", void 0);
exports.hotelBooking = hotelBooking = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'hotel_booking',
        timestamps: true,
    })
], hotelBooking);
