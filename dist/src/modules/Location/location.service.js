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
const location_model_1 = require("./location.model");
const hotel_Model_1 = require("../Hotel/hotel.Model");
class location {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield location_model_1.Location.findAll({});
        });
    }
    static findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield location_model_1.Location.findOne({ where: { id } });
        });
    }
    static Create(all) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield location_model_1.Location.create(all);
        });
    }
    static Update(updated, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield location_model_1.Location.update(updated, query);
        });
    }
    static Destroy(deleted) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield location_model_1.Location.destroy(deleted);
        });
    }
    static find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotel_Model_1.Hotel.findOne({ where: { id } });
        });
    }
}
exports.default = location;
