"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
exports.UserModel = new mongoose_1.Schema({
    userId: String,
    userName: String,
});
