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
const hotel_Model_1 = require("../Hotel/hotel.Model");
const location_model_1 = require("../Location/location.model");
const area_model_1 = require("../Area/area.model");
const halldetails_model_1 = require("../HallDetails/halldetails.model");
class allHotel {
    static findAll(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotel_Model_1.Hotel.findOne({
                where: { id },
                attributes: ['id', 'hotelName'],
                include: [
                    {
                        model: location_model_1.Location,
                        attributes: ['id', 'location'],
                        include: [
                            {
                                model: area_model_1.Area,
                                attributes: ['id', 'area'], // Only include the area ID
                                include: [
                                    {
                                        model: halldetails_model_1.Hall,
                                        attributes: ['id', 'category', 'capacity', 'session', 'floor'], // Include only these fields from the hall
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        });
    }
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield hotel_Model_1.Hotel.findAll();
        });
    }
    static findAllHall() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield halldetails_model_1.Hall.findAll({ where: { isAvailable: true } });
        });
    }
}
exports.default = allHotel;
