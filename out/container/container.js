"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appContainer = void 0;
require("reflect-metadata");
var inversify_1 = require("inversify");
var types_1 = require("../types/types");
var MongoDBContext_1 = require("../db/MongoDBContext");
var AuthRepository_1 = require("../repository/AuthRepository");
var passport_service_1 = require("../services/passport-service");
var appContainer = new inversify_1.Container();
exports.appContainer = appContainer;
appContainer.bind(types_1.TYPES.IDBContext).to(MongoDBContext_1.MongoDBContext).inSingletonScope();
appContainer.bind(types_1.TYPES.IRepository).to(AuthRepository_1.AuthRepository);
appContainer.bind(types_1.TYPES.IService).to(passport_service_1.PassportService);
