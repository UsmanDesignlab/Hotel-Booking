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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hotelImages_service_1 = __importDefault(require("./hotelImages.service"));
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield hotelImages_service_1.default.findAll();
        if (!data) {
            return res.status(404).json({ message: "No Diagnosis found" });
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
        const data = yield hotelImages_service_1.default.findOne(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "Images not found" });
        }
        res.status(200).json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err });
    }
});
exports.one = one;
const add = (req, res, imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, token not provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        req.user = decoded;
        if (decoded) {
            let { hotelImages } = req.body;
            if (req.file) {
                imagePath = req.file.path;
            }
        }
        const data = yield hotelImages_service_1.default.AllCreates({
            hotelImages: imagePath,
            userId: req.user.id
        });
        res.status(201).json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err });
    }
});
exports.add = add;
const update = (req, res, imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { hotelImages } = req.body;
        const { id } = req.params;
        const data = yield hotelImages_service_1.default.findOne(id);
        if (!data) {
            return res.status(404).json({ message: "diagnosis not found" });
        }
        if (req.file) {
            imagePath = req.file.path;
        }
        const updated = yield hotelImages_service_1.default.Update({ hotelImages: imagePath }, { where: { id } });
        if (!updated) {
            return res.status(400).json({ message: "Failed to update images" });
        }
        res.status(200).json({ message: "Images updated successfully" });
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
        const eventToDelete = yield hotelImages_service_1.default.findOne(id);
        if (!eventToDelete) {
            return res.status(404).json({ message: "Images not found" });
        }
        const deleted = yield hotelImages_service_1.default.Destroy({ where: { id } });
        if (!deleted) {
            return res.status(400).json({ message: "Failed to delete event" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err });
    }
});
exports.destroy = destroy;
