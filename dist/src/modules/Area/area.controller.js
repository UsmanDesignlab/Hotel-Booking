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
const area_service_1 = __importDefault(require("./area.service"));
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield area_service_1.default.findAll();
        if (!data) {
            return res.status(404).json({ message: "No Area found" });
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
        const data = yield area_service_1.default.findOne(req.params.id);
        if (!data) {
            return res.status(404).json({ message: " Area not found" });
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
        let { area: loc, locationId } = req.body;
        const one = yield area_service_1.default.findOneUser(locationId);
        if (!one) {
            return res.status(404).json({ message: "Location not found" });
        }
        const data = yield area_service_1.default.Create({
            area: loc,
            locationId: locationId,
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
        let { locationId, area: loc } = req.body;
        const { id } = req.params;
        const data = yield area_service_1.default.findOne(id);
        if (!data) {
            return res.status(404).json({ message: "Area not found" });
        }
        const one = yield area_service_1.default.findOneUser(locationId);
        if (!one) {
            return res.status(404).json({ message: "Location not found" });
        }
        const updated = yield area_service_1.default.Update({ locationId, area: loc }, { where: { id } });
        if (!updated) {
            return res.status(400).json({ message: "Failed to update Area" });
        }
        res.status(200).json({ message: "Area updated successfully" });
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
        const eventToDelete = yield area_service_1.default.findOne(id);
        if (!eventToDelete) {
            return res.status(404).json({ message: "Area not found" });
        }
        const deleted = yield area_service_1.default.Destroy({ where: { id } });
        if (!deleted) {
            return res.status(400).json({ message: "Failed to delete Area" });
        }
        res.status(200).json({ message: "Event Area successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err });
    }
});
exports.destroy = destroy;