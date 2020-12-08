"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwt: {
        secret: String(process.env.APP_SECRET),
        //secret:"asdasdasdasd",
        expiresIn: '1d'
    }
};
