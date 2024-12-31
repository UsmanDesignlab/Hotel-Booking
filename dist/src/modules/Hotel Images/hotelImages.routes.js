"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotelImages_controller_1 = require("./hotelImages.controller");
const isloggedIn_1 = require("../../helper/isloggedIn");
const router = express_1.default.Router({ mergeParams: true });
router.get("/", hotelImages_controller_1.all);
router.get("/:id", hotelImages_controller_1.one);
router.post("/", isloggedIn_1.isLoggedIn, isloggedIn_1.isOwner, hotelImages_controller_1.add);
router.patch('/:id', isloggedIn_1.isLoggedIn, isloggedIn_1.isOwner, hotelImages_controller_1.update);
router.delete("/:id", isloggedIn_1.isLoggedIn, isloggedIn_1.isOwner, hotelImages_controller_1.destroy);
exports.default = router;
