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
const hotelImages_model_1 = require("./hotelImages.model");
class image {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotelImages_model_1.Image.findAll({});
        });
    }
    static findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotelImages_model_1.Image.findOne({ where: { id } });
        });
    }
    static AllCreates(all) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotelImages_model_1.Image.create(all);
        });
    }
    static Update(updated, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotelImages_model_1.Image.update(updated, query);
        });
    }
    static Destroy(deleted) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotelImages_model_1.Image.destroy(deleted);
        });
    }
    static findOneOne(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotelImages_model_1.Image.findOne({ where: { userId } });
        });
    }
    static findOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotelImages_model_1.Image.findOne({ where: { id } });
        });
    }
}
exports.default = image;
