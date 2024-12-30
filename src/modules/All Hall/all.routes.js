"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const all_controller_1 = require("./all.controller");
const router = express_1.default.Router({ mergeParams: true });
router.get("/", all_controller_1.all);
router.get("/:id", all_controller_1.one);
exports.default = router;
