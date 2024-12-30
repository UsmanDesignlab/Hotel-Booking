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
const location_model_1 = require("../Location/location.model");
const area_model_1 = require("./area.model");
class area {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield area_model_1.Area.findAll({});
        });
    }
    static findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield area_model_1.Area.findOne({ where: { id } });
        });
    }
    static Create(all) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield area_model_1.Area.create(all);
        });
    }
    static Update(updated, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield area_model_1.Area.update(updated, query);
        });
    }
    static Destroy(deleted) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield area_model_1.Area.destroy(deleted);
        });
    }
    static findOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield location_model_1.Location.findOne({ where: { id } });
        });
    }
}
exports.default = area;
