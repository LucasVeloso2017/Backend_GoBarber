import IStorageProvider from '@shared/container/providers/storageProviders/models/IStorageProvider'
import DiskStorageProvider from '@shared/container/providers/storageProviders/implementations/DiskStorageProvider'
import ISendForgotPasswordMail from '@shared/container/providers/mailProvider/models/ISendForgotPasswordEmail'
import SendForgotPasswordMail from '@shared/container/providers/mailProvider/implementations/SendForgotPasswordEmailService'

import {container} from 'tsyringe'

container.registerSingleton<IStorageProvider>(
    'StorageProvider',DiskStorageProvider
)
/*
container.registerSingleton<ISendForgotPasswordMail>(
    'MailProvider',SendForgotPasswordMail
)
*/