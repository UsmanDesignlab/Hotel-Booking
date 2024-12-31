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
exports.isLoggedIn = isLoggedIn;
exports.isOwner = isOwner;
exports.isClient = isClient;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function isLoggedIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.cookies.token) {
            return res.status(401).send("You are not logged in");
        }
        try {
            const data = jsonwebtoken_1.default.verify(req.cookies.token, "secret");
            req.user = data;
            // This sets the user data, including role
            next();
        }
        catch (err) {
            return res.status(401).send("Invalid token");
        }
    });
}
function isOwner(req, res, next) {
    if (!req.user || req.user.role !== 'Owner') {
        return res.status(403).send("Forbidden: Owner only");
    }
    next();
}
function isClient(req, res, next) {
    if (!req.user || req.user.role !== 'Client') {
        return res.status(403).send("Forbidden:Client only");
    }
    next();
}
