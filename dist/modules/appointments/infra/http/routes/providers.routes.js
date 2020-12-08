"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var ensureAuth_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuth"));
var providersController_1 = __importDefault(require("@modules/appointments/infra/http/controllers/providersController"));
var monthAvailableController_1 = __importDefault(require("@modules/appointments/infra/http/controllers/monthAvailableController"));
var dayAvailableController_1 = __importDefault(require("@modules/appointments/infra/http/controllers/dayAvailableController"));
var providersRoutes = express_1.Router();
var providersController = new providersController_1.default();
var monthAvailableController = new dayAvailableController_1.default();
var dayAvailableController = new monthAvailableController_1.default();
providersRoutes.use(ensureAuth_1.default);
providersRoutes.get('/', providersController.index);
providersRoutes.delete('/:admin_id/delete-users/:provider_id', providersController.destroy);
providersRoutes.get('/:provider_id/month-availability', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        provider_id: celebrate_1.Joi.string().uuid().required()
    },
    _a)), monthAvailableController.index);
providersRoutes.get('/:provider_id/day-availability', celebrate_1.celebrate((_b = {},
    _b[celebrate_1.Segments.PARAMS] = {
        provider_id: celebrate_1.Joi.string().uuid().required()
    },
    _b)), dayAvailableController.index);
exports.default = providersRoutes;
