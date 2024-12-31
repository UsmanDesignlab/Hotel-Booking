"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_controller_1 = require("./User.controller");
const router = express_1.default.Router({ mergeParams: true });
router.post("/email", User_controller_1.send);
router.post("/register", User_controller_1.userRegister);
router.post("/logout", User_controller_1.userLogout);
router.post("/login", User_controller_1.loginRegister);
exports.default = router;
