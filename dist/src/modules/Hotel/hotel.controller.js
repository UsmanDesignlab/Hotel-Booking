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
exports.allHotel = exports.destroy = exports.update = exports.add = exports.one = exports.all = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hotel_server_1 = __importDefault(require("./hotel.server"));
const hotel_email_1 = require("./hotel.email");
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield hotel_server_1.default.findAll();
        if (!data) {
            return res.status(404).json({ message: "No Patient found" });
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
        const data = yield hotel_server_1.default.findOne(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "Hotel not found" });
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
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, token not provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        console.log(decoded);
        req.user = decoded;
        console.log(req.user.email);
        if (decoded) {
            const { hotelName, phoneNumber } = req.body;
            const existingDoctor = yield hotel_server_1.default.findOneOne(req.user.id);
            if (existingDoctor) {
                return res.status(409).json({ message: "Hotel Already Exists" });
            }
            // Create new doctor entry
            const newDoctor = yield hotel_server_1.default.AllCreates({
                hotelName,
                phoneNumber,
                userId: req.user.id
            });
            if (decoded.email) {
                const subject = `Welcome to the Registration for Hotel ${newDoctor.hotelName}`;
                const text = `You have successfully registered as a Hotel.\n
          PhoneNumber: ${newDoctor.phoneNumber}\n
          `;
                try {
                    yield (0, hotel_email_1.sendEmail)(decoded.email, subject, text);
                }
                catch (emailErr) {
                    console.error('Failed to send email:', emailErr);
                    return res.status(500).json({ message: "Failed to send email" });
                }
            }
            else {
                return res.status(400).json({ message: "User email is not available" });
            }
            // Return successful response
            return res.status(201).json(newDoctor);
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred", error: err });
    }
});
exports.add = add;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { hotelName, phoneNumber } = req.body;
        const { id } = req.params;
        const data = yield hotel_server_1.default.findOne(id);
        if (!data) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        const updated = yield hotel_server_1.default.Update({ hotelName, phoneNumber }, { where: { id } });
        if (!updated) {
            return res.status(400).json({ message: "Failed to update Hotel" });
        }
        res.status(200).json({ message: "Hotel updated successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while updating the event", error: err });
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const eventToDelete = yield hotel_server_1.default.findOne(id);
        if (!eventToDelete) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        const deleted = yield hotel_server_1.default.Destroy({ where: { id } });
        if (!deleted) {
            return res.status(400).json({ message: "Hotel to delete event" });
        }
        res.status(200).json({ message: "Hotel deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err });
    }
});
exports.destroy = destroy;
const allHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, token not provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        req.user = decoded;
        let User = yield hotel_server_1.default.findOneUser(req.user.id);
        if (!User) {
            return res.status(401).json({ message: "No User found" });
        }
        let Patient = yield hotel_server_1.default.findOnePatient(req.user.id);
        if (!Patient) {
            return res.status(401).json({ message: "NO DATA AVAILABLE" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err });
    }
});
exports.allHotel = allHotel;
