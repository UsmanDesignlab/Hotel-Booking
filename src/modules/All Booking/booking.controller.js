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
const booking_service_1 = __importDefault(require("./booking.service"));
const one = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id: userId } = req.params;
        const data = yield booking_service_1.default.findOne(userId);
        if (!data) {
            return res.status(404).json({ message: "No Booking found" });
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
        const data = yield booking_service_1.default.findAll();
        if (!data) {
            return res.status(404).json({ message: "No Booking found" });
        }
        res.status(200).json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err });
    }
});
exports.all = all;
