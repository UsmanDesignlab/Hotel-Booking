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
exports.oneAll = exports.all = void 0;
const bookingService_1 = __importDefault(require("./bookingService"));
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield bookingService_1.default.findALL();
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
exports.all = all;
const oneAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { areaId } = req.params;
        const booking = yield bookingService_1.default.find({ where: { areaId } });
        if (!booking) {
            return res.status(404).json({ message: "No Halls" });
        }
        res.status(200).json(booking);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err });
    }
});
exports.oneAll = oneAll;
