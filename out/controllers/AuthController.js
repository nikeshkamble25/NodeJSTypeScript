"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var AuthHandler_1 = require("../handlers/AuthHandler");
var passport_1 = __importDefault(require("passport"));
var AuthController = /** @class */ (function () {
    function AuthController() {
        this._authHandler = new AuthHandler_1.AuthHandler();
    }
    AuthController.prototype.registerRoutes = function (app) {
        app.get('/', this._authHandler.handleIndex);
        app.get('/login', passport_1.default.authenticate('google', {
            scope: ['profile', 'email'],
        }), this._authHandler.handleLogin);
        app.get('/auth/response', passport_1.default.authenticate('google'), this._authHandler.handleResponse);
        app.get('/currentuser', this._authHandler.handleCurrentUser);
        app.get('/logout', this._authHandler.handleLogout);
    };
    return AuthController;
}());
exports.AuthController = AuthController;
