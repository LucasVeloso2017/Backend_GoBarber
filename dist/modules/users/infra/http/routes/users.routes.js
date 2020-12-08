"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var celebrate_1 = require("celebrate");
var upload_1 = __importDefault(require("@config/upload"));
var ensureAuth_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuth"));
var usersController_1 = __importDefault(require("@modules/users/infra/http/controllers/usersController"));
var userAvatarController_1 = __importDefault(require("@modules/users/infra/http/controllers/userAvatarController"));
var usersAdminController_1 = __importDefault(require("@modules/users/infra/http/controllers/usersAdminController"));
var usersCostumerController_1 = __importDefault(require("@modules/users/infra/http/controllers/usersCostumerController"));
var usersController = new usersController_1.default();
var userAvatarController = new userAvatarController_1.default();
var userAdminController = new usersAdminController_1.default();
var userCostumerController = new usersCostumerController_1.default();
var usersRouter = express_1.Router();
var upload = multer_1.default(upload_1.default);
usersRouter.patch('/avatar', ensureAuth_1.default, upload.single('avatar'), userAvatarController.update);
usersRouter.post('/', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required()
    },
    _a)), usersController.create);
usersRouter.post('/admin', userAdminController.create);
usersRouter.post('/costumer', userCostumerController.create);
exports.default = usersRouter;
