"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var DiskStorageProvider_1 = __importDefault(require("@shared/container/providers/storageProviders/implementations/DiskStorageProvider"));
var EtherealMailProvider_1 = __importDefault(require("@shared/container/providers/mailProvider/implementations/EtherealMailProvider"));
var HashProviderService_1 = __importDefault(require("@shared/container/providers/hashProvider/implementations/HashProviderService"));
var handlebarsMailTemplateProvider_1 = __importDefault(require("@shared/container/providers/mailTemplateProvider/implementations/handlebarsMailTemplateProvider"));
var RedisCacheProvider_1 = __importDefault(require("./cacheProvider/implementations/RedisCacheProvider"));
tsyringe_1.container.registerSingleton('StorageProvider', DiskStorageProvider_1.default);
tsyringe_1.container.registerSingleton('CacheProvider', RedisCacheProvider_1.default);
tsyringe_1.container.registerSingleton('HashProvider', HashProviderService_1.default);
tsyringe_1.container.registerSingleton('MailTemplateProvider', handlebarsMailTemplateProvider_1.default);
tsyringe_1.container.registerInstance('MailProvider', tsyringe_1.container.resolve(EtherealMailProvider_1.default));
