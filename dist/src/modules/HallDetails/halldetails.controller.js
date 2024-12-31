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
exports.hallOne = exports.add = void 0;
const halldetails_service_1 = __importDefault(require("./halldetails.service"));
let hallOne = [];
exports.hallOne = hallOne;
let currentId = 1;
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { capacity, amount, areaId, userId, date, session } = req.body;
        const areaExists = yield halldetails_service_1.default.findOneUser(areaId);
        if (!areaExists) {
            return res.status(404).json({ message: "Area not found" });
        }
        if (session === "Morning" || session === "Both") {
            hallOne.push({
                id: currentId++,
                capacity,
                date,
                session: "Morning",
                amount,
                areaId,
                userId: req.user.id,
                isAvailable: true,
            });
        }
        if (session === "Evening" || session === "Both") {
            hallOne.push({
                id: currentId++,
                capacity,
                date,
                session: "Evening",
                amount,
                areaId,
                userId: req.user.id,
                isAvailable: true,
            });
        }
        const days = 7;
        const start = new Date(date);
        for (let i = 1; i <= days; i++) {
            const currentDate = new Date(start);
            currentDate.setDate(start.getDate() + i);
            const formattedDate = currentDate.toISOString().split("T")[0];
            if (session === "Morning" || session === "Both") {
                hallOne.push({
                    id: currentId++,
                    capacity,
                    date: formattedDate,
                    session: "Morning",
                    amount,
                    areaId,
                    userId: req.user.id,
                    isAvailable: true,
                });
            }
            if (session === "Evening" || session === "Both") {
                hallOne.push({
                    id: currentId++,
                    capacity,
                    date: formattedDate,
                    session: "Evening",
                    amount,
                    areaId,
                    userId: req.user.id,
                    isAvailable: true,
                });
            }
        }
        res.status(201).json({
            message: `Hall details added successfully for today and the next ${days} days.`,
            data: hallOne,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err });
    }
});
exports.add = add;
