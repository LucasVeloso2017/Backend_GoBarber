"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./providers");
var tsyringe_1 = require("tsyringe");
var appointmentsRepositories_1 = __importDefault(require("@modules/appointments/infra/typeorm/repositories/appointmentsRepositories"));
var usersRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/usersRepository"));
var UsersTokenRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UsersTokenRepository"));
var NotificationsRepositories_1 = __importDefault(require("@modules/notifications/infra/typeorm/repositories/NotificationsRepositories"));
tsyringe_1.container.registerSingleton('UsersRepository', usersRepository_1.default);
tsyringe_1.container.registerSingleton('AppointmentsRepository', appointmentsRepositories_1.default);
tsyringe_1.container.registerSingleton('UsersTokenRepository', UsersTokenRepository_1.default);
tsyringe_1.container.registerSingleton('NotificationsRepositories', NotificationsRepositories_1.default);
