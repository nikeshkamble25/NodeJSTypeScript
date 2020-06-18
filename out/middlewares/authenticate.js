"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleWares = void 0;
var AuthMiddleWares = /** @class */ (function () {
    function AuthMiddleWares() {
    }
    AuthMiddleWares.prototype.ResolveMiddleWare = function (request, response, next) {
        if (request.user)
            next();
        response.statusCode = 401;
        response.send('Invalid User');
    };
    return AuthMiddleWares;
}());
exports.AuthMiddleWares = AuthMiddleWares;
