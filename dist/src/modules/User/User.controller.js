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
exports.userLogout = exports.loginRegister = exports.userRegister = exports.send = void 0;
const User_service_1 = __importDefault(require("./User.service"));
const user_emailmodel_1 = require("./user.emailmodel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_email_1 = require("./User.email");
const send = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const existingUser = yield user_emailmodel_1.Email.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const token = jsonwebtoken_1.default.sign({ email }, "secret", { expiresIn: "1h" });
        const link = `http://localhost:4000/api/register?token=${token}`;
        yield (0, User_email_1.sendEmail)(email, 'Verify Your Email', `Please verify your email by clicking on this link: ${link}`);
        res.status(201).json({ message: 'Verification email sent.', link });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.send = send;
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, role, phoneNumber } = req.body;
        const token = req.query.token;
        if (!token) {
            return res.status(400).json({ message: "Token is missing from the request" });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, "secret");
        const email = decodedToken.email; // Get the email from the token
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield User_service_1.default.AllCreates({
            email,
            username,
            password: hashedPassword,
            role,
            phoneNumber,
        });
        // Generate a token for the user after registration
        const userToken = jsonwebtoken_1.default.sign({ id: newUser.id }, "secret", { expiresIn: "4h" });
        res.cookie("token", userToken);
        res.status(201).json({ message: "User registered successfully", token: userToken });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error occurred during registration" });
    }
});
exports.userRegister = userRegister;
// User login
const loginRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_service_1.default.findOne(email);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role, email: user.email }, "secret", { expiresIn: "4h" });
        res.cookie("token", token);
        //${link}?token=${jwt}
        res.status(200).json({ message: "Login successful", token });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred during login" });
    }
});
exports.loginRegister = loginRegister;
const userLogout = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred during logout" });
    }
};
exports.userLogout = userLogout;
