"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
var AuthRoutes = /** @class */ (function () {
    function AuthRoutes(app) {
        this._app = app;
    }
    AuthRoutes.prototype.HelloWorldRoute = function () {
        this._app.get('/', function (req, res) {
            res.send('Hi there');
        });
    };
    AuthRoutes.prototype.RegisterRoutes = function () {
        this.HelloWorldRoute();
    };
    return AuthRoutes;
}());
exports.AuthRoutes = AuthRoutes;
