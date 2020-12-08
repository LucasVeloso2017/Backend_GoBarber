"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var appError_1 = __importDefault(require("@shared/errors/appError"));
var config_1 = __importDefault(require("@config/config"));
function ensureAuth(request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new appError_1.default('Missing Token', 401);
    }
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, config_1.default.jwt.secret);
        var sub = decoded.sub;
        request.user = {
            id: sub
        };
        return next();
    }
    catch (_b) {
        throw new appError_1.default('invalid JWT Token', 401);
    }
}
exports.default = ensureAuth;
