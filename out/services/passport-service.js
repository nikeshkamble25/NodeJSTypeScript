"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassportService = void 0;
var passport_1 = __importDefault(require("passport"));
var passport_google_oauth_1 = __importDefault(require("passport-google-oauth"));
var container_1 = require("../container/container");
var types_1 = require("../types/types");
var PassportService = /** @class */ (function () {
    function PassportService() {
        var _this = this;
        this.serializeUser = function () {
            passport_1.default.serializeUser(function (_a, done) {
                var id = _a.id;
                done(null, id);
            });
        };
        this.deserializeUser = function () {
            passport_1.default.deserializeUser(function (id, done) { return __awaiter(_this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._repo.get(id)];
                        case 1:
                            user = _a.sent();
                            if (user) {
                                done(null, user);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        this.useStrategy = function () {
            passport_1.default.use(new passport_google_oauth_1.default.OAuth2Strategy({
                clientID: '353490325350-23usoqj788j4m6npnsqjun2pgk44s716.apps.googleusercontent.com',
                clientSecret: 'tFvEiMrDGGl1bOGmMT4vlX7w',
                callbackURL: 'http://localhost:8000/auth/response',
            }, function (token, tokenSecret, profile, done) { return __awaiter(_this, void 0, void 0, function () {
                var savedUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._repo.getObject({
                                userId: parseInt(profile.id),
                            })) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._repo.save({
                                    userName: profile.displayName,
                                    userId: parseInt(profile.id),
                                })];
                        case 1:
                            savedUser = _a.sent();
                            done(null, savedUser);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); }));
        };
        this._repo = container_1.appContainer.get(types_1.TYPES.IRepository);
    }
    PassportService.prototype.registerService = function () {
        this.serializeUser();
        this.deserializeUser();
        this.useStrategy();
    };
    return PassportService;
}());
exports.PassportService = PassportService;
