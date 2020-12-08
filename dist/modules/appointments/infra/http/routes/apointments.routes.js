"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensureAuth_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuth"));
var appointmentsController_1 = __importDefault(require("@modules/appointments/infra/http/controllers/appointmentsController"));
var providerAppointmentsController_1 = __importDefault(require("@modules/appointments/infra/http/controllers/providerAppointmentsController"));
var appointmentsRouter = express_1.Router();
var appointmentsController = new appointmentsController_1.default();
var providerAppointmentsController = new providerAppointmentsController_1.default();
appointmentsRouter.use(ensureAuth_1.default);
appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);
exports.default = appointmentsRouter;
/*
celebrate({
    [Segments.BODY]:{
        provider_id:Joi.string().uuid().required(),
        //date:Joi.string()
    }

})*/ 
