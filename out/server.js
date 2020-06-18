"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cluster_1 = __importDefault(require("cluster"));
var app_1 = require("./app");
var AuthController_1 = require("./controllers/AuthController");
var cookie_session_1 = __importDefault(require("cookie-session"));
var passport_1 = __importDefault(require("passport"));
var container_1 = require("./container/container");
var types_1 = require("./types/types");
var passport_service_1 = require("./services/passport-service");
if (cluster_1.default.isMaster) {
    for (var index = 0; index < 2; index++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', function (worker) {
        console.log("worker " + worker.process.pid + " stopped working");
        cluster_1.default.fork();
    });
    cluster_1.default.on('fork', function (worker) {
        console.log("Worker " + worker.process.pid + " started");
    });
}
else {
    //Declare variables
    //Context and application object
    var context = container_1.appContainer.get(types_1.TYPES.IDBContext);
    context.registerSchemas();
    context.connect();
    var application = new app_1.App({
        port: 8000,
        controllers: [new AuthController_1.AuthController()],
        middleWares: [
            cookie_session_1.default({
                maxAge: 5000 * 1000,
                keys: ['32143243ade4324324'],
            }),
            passport_1.default.initialize(),
            passport_1.default.session(),
        ],
        services: [new passport_service_1.PassportService()],
    });
    application.start();
}
