"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const halldetails_controller_1 = require("./halldetails.controller");
const isloggedIn_1 = require("../../helper/isloggedIn");
const router = express_1.default.Router({ mergeParams: true });
// router.get("/", all);
// router.get("/:id", one);
router.post("/", isloggedIn_1.isLoggedIn, isloggedIn_1.isOwner, halldetails_controller_1.add);
// router.patch('/:id',isLoggedIn,isOwner,update)
// router.delete("/:id",isLoggedIn,isOwner,destroy)
exports.default = router;
