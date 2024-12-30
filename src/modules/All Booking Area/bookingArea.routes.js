"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingArea_controller_1 = require("./bookingArea.controller");
const router = express_1.default.Router({ mergeParams: true });
router.get("/", bookingArea_controller_1.all);
router.get("/:id", bookingArea_controller_1.oneAll);
exports.default = router;
