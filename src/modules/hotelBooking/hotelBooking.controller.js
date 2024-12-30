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
exports.destroy = exports.update = exports.add = exports.one = exports.all = void 0;
const hotelBooking_server_1 = __importDefault(require("./hotelBooking.server"));
const halldetails_controller_1 = require("../HallDetails/halldetails.controller");
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield hotelBooking_server_1.default.findAll();
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
const one = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield hotelBooking_server_1.default.findOne(id);
        if (!data) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err });
    }
});
exports.one = one;
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phoneNumber, bookingDate, amount, hallId } = req.body;
        // Find the hall by hallId
        const hall = halldetails_controller_1.hallOne.find(h => h.id === hallId);
        if (!hall) {
            return res.status(404).json({ message: "Hall not found" });
        }
        // const existingBooking = await booking.findTwo(hallId);
        // if (existingBooking) {
        //   return res.status(400).json({ message: "This hall is already booked" });
        // }
        // Create a new booking entry
        const bookingEntry = yield hotelBooking_server_1.default.Create({
            name,
            phoneNumber,
            bookingDate,
            amount,
            hallId,
            userId: req.user.id,
        });
        hall.isAvailable = false;
        res.status(201).json({
            message: "Booking successful",
            data: bookingEntry,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err });
    }
});
exports.add = add;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phoneNumber, bookingDate, amount, hallId } = req.body;
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Missing id parameter" });
        }
        const data = yield hotelBooking_server_1.default.findOne(id);
        if (!data) {
            return res.status(404).json({ message: "Booking not found" });
        }
        const hall = halldetails_controller_1.hallOne.find(h => h.id === hallId);
        if (!hall) {
            return res.status(404).json({ message: "Hall not found" });
        }
        const updated = yield hotelBooking_server_1.default.Update({ name, phoneNumber, bookingDate, amount, hallId }, { where: { id } });
        if (!updated) {
            return res.status(400).json({ message: "Failed to update booking" });
        }
        res.status(200).json({ message: "Booking updated successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while updating the booking", error: err });
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const eventToDelete = yield hotelBooking_server_1.default.findOne(id);
        if (!eventToDelete) {
            return res.status(404).json({ message: "Booking not found" });
        }
        yield hotelBooking_server_1.default.destroy({ where: { id } });
        // Optionally, mark the hall as available again
        const hall = halldetails_controller_1.hallOne.find(h => h.id === eventToDelete.hallId);
        if (hall) {
            hall.isAvailable = true;
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err });
    }
});
exports.destroy = destroy;
