"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBContext = void 0;
var inversify_1 = require("inversify");
var mongoose_1 = require("mongoose");
var user_1 = require("../schema/user");
var MongoDBContext = /** @class */ (function () {
    function MongoDBContext() {
        this.mongoose = new mongoose_1.Mongoose();
    }
    MongoDBContext.prototype.getDBContext = function () {
        return this.mongoose;
    };
    MongoDBContext.prototype.registerSchemas = function () {
        this.mongoose.model('User', user_1.UserModel);
    };
    MongoDBContext.prototype.connect = function () {
        this.mongoose.model('User', user_1.UserModel);
        this.mongoose.connect('mongodb+srv://nikesh:nikesh@cluster0-icocy.azure.mongodb.net/node-tutorial?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
            console.log('Connection to database success');
        });
    };
    MongoDBContext.prototype.disconnect = function () {
        this.mongoose.disconnect();
    };
    MongoDBContext.prototype.dispose = function () {
        throw new Error('Method not implemented.');
    };
    MongoDBContext = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], MongoDBContext);
    return MongoDBContext;
}());
exports.MongoDBContext = MongoDBContext;
