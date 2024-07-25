"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const auth = (0, express_1.Router)();
auth.get('/', (req, res) => { res.send('hello'); });
auth.post('/login', authController_1.login);
auth.post('/register', authController_1.register);
exports.default = auth;
