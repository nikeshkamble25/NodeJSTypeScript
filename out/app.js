"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authroutes_1 = require("./routes/authroutes");
var app = express_1.default();
var authRoutes = new authroutes_1.AuthRoutes(app);
authRoutes.RegisterRoutes();
app.listen(5002, function (err) {
    console.log('Server is listening 5002');
});
