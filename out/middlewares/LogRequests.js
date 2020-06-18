"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogRequestMiddleWares = void 0;
var LogRequestMiddleWares = /** @class */ (function () {
    function LogRequestMiddleWares() {
    }
    LogRequestMiddleWares.prototype.ResolveMiddleWare = function (request, response, next) {
        console.log('log middleware ' + process.pid.toString());
        next();
    };
    return LogRequestMiddleWares;
}());
exports.LogRequestMiddleWares = LogRequestMiddleWares;
