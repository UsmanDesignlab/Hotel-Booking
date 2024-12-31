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
const hotel_Model_1 = require("./hotel.Model");
const User_Model_1 = require("../User/User.Model");
class hotel {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotel_Model_1.Hotel.findAll({});
        });
    }
    static findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotel_Model_1.Hotel.findOne({ where: { id } });
        });
    }
    static AllCreates(all) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotel_Model_1.Hotel.create(all);
        });
    }
    static Update(updated, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotel_Model_1.Hotel.update(updated, query);
        });
    }
    static Destroy(deleted) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotel_Model_1.Hotel.destroy(deleted);
        });
    }
    static findOneOne(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotel_Model_1.Hotel.findOne({ where: { userId } });
        });
    }
    static findOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_Model_1.Users.findOne({ where: { id } });
        });
    }
    static findOnePatient(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotel_Model_1.Hotel.findOne({ where: { userId } });
        });
    }
}
exports.default = hotel;
