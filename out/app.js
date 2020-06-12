"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express_1 = __importDefault(require("express"));
var App = /** @class */ (function () {
    function App(appInit) {
        this._app = express_1.default();
        this._port = appInit.port;
        this.RegisterMiddleWares(appInit.middleWares);
        this.RegisterControllers(appInit.controllers);
        this.RegisterServices(appInit.services);
    }
    App.prototype.RegisterControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (routes) {
            routes.registerRoutes(_this._app);
        });
    };
    App.prototype.RegisterServices = function (services) {
        services.forEach(function (service) {
            service.registerService();
        });
    };
    App.prototype.RegisterMiddleWares = function (middleWares) {
        var _this = this;
        middleWares.forEach(function (middleware) {
            _this._app.use(middleware);
        });
    };
    App.prototype.start = function () {
        this._app.listen(this._port, function () {
            console.log('App listing to port');
        });
    };
    return App;
}());
exports.App = App;
