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
const area_model_1 = require("../Area/area.model");
const halldetails_model_1 = require("./halldetails.model");
class hall {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield halldetails_model_1.Hall.findAll({});
        });
    }
    static findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield halldetails_model_1.Hall.findOne({ where: { id } });
        });
    }
    static Create(all) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield halldetails_model_1.Hall.create(all);
        });
    }
    static Update(updated, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield halldetails_model_1.Hall.update(updated, query);
        });
    }
    static Destroy(deleted) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield halldetails_model_1.Hall.destroy(deleted);
        });
    }
    static findOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield area_model_1.Area.findOne({ where: { id } });
        });
    }
    static bulkCreateWithDateRange(hallDetails, days) {
        return __awaiter(this, void 0, void 0, function* () {
            const { capacity, category, floor, amount, areaId, userId, date } = hallDetails;
            // Create an array to store hall details for each date and session
            const hallDetailsArray = [];
            const start = new Date(date);
            // Validate the start date
            if (isNaN(start.getTime())) {
                throw new Error(`Invalid startDate: ${date}`);
            }
            for (let i = 0; i < days; i++) {
                const currentDate = new Date(start);
                currentDate.setDate(start.getDate() + i);
                const formattedDate = currentDate.toISOString().split("T")[0];
                hallDetailsArray.push({
                    capacity,
                    category: "Simple",
                    date: formattedDate,
                    floor: "First",
                    amount,
                    areaId,
                    userId,
                    session: "Morning"
                }, {
                    capacity,
                    category: "Simple",
                    date: formattedDate,
                    floor: "First",
                    amount,
                    areaId,
                    userId,
                    session: "Evening"
                }, {
                    capacity,
                    category: "Premium",
                    date: formattedDate,
                    floor: "Second",
                    amount,
                    areaId,
                    userId,
                    session: "Morning"
                }, {
                    capacity,
                    category: "Premium",
                    date: formattedDate,
                    floor: "Second",
                    amount,
                    areaId,
                    userId,
                    session: "Evening"
                });
            }
            return yield halldetails_model_1.Hall.bulkCreate(hallDetailsArray);
        });
    }
}
exports.default = hall;
