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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = exports.one = void 0;
const all_service_1 = __importDefault(require("./all.service"));
const halldetails_controller_1 = require("../HallDetails/halldetails.controller");
const one = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id: userId } = req.params;
        const data = yield all_service_1.default.findAll(userId);
        if (!data) {
            return res.status(404).json({ message: "No Hotel found" });
        }
        res.status(200).json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err });
    }
});
exports.one = one;
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!halldetails_controller_1.hallOne) {
            return res.status(404).json({ message: "No available halls found" });
        }
        res.status(200).json(halldetails_controller_1.hallOne);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err });
    }
});
exports.all = all;
