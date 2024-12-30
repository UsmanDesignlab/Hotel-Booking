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
const User_Model_1 = require("./User.Model");
class users {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_Model_1.Users.findAll({});
        });
    }
    static findOne(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_Model_1.Users.findOne({ where: { email } });
        });
    }
    static AllCreates(all) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_Model_1.Users.create(all);
        });
    }
    static find(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_Model_1.Users.findOne({ where: { password } });
        });
    }
    static Update(updated, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_Model_1.Users.update(updated, query);
        });
    }
    static Destroy(deleted) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_Model_1.Users.destroy(deleted);
        });
    }
}
exports.default = users;
