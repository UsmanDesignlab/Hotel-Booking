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
const hotelBooking_Model_1 = require("./hotelBooking.Model");
const halldetails_model_1 = require("../HallDetails/halldetails.model");
class booking {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotelBooking_Model_1.hotelBooking.findAll({});
        });
    }
    static findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotelBooking_Model_1.hotelBooking.findOne({ where: { id } });
        });
    }
    static Create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotelBooking_Model_1.hotelBooking.create(data);
        });
    }
    static Update(updated, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotelBooking_Model_1.hotelBooking.update(updated, query);
        });
    }
    static destroy(deleted) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotelBooking_Model_1.hotelBooking.destroy(deleted);
        });
    }
    static find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield halldetails_model_1.Hall.findOne({ where: { id } });
        });
    }
    static findTwo(hallId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotelBooking_Model_1.hotelBooking.findOne({ where: { hallId } });
        });
    }
    static availability(hallId, isAvailable) {
        return __awaiter(this, void 0, void 0, function* () {
            yield halldetails_model_1.Hall.update({ isAvailable }, { where: { id: hallId } });
        });
    }
    ;
}
exports.default = booking;
