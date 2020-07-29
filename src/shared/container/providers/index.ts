import {container} from 'tsyringe'

import IStorageProvider from '@shared/container/providers/storageProviders/models/IStorageProvider'
import DiskStorageProvider from '@shared/container/providers/storageProviders/implementations/DiskStorageProvider'

import ISendForgotPasswordMail from '@shared/container/providers/mailProvider/models/ISendForgotPasswordEmail'
import EtherealMailProvider from '@shared/container/providers/mailProvider/implementations/EtherealMailProvider'

import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider'
import HashProvider from '@shared/container/providers/hashProvider/implementations/HashProviderService'


container.registerSingleton<IStorageProvider>(
    'StorageProvider',DiskStorageProvider
)

container.registerSingleton<IHashProvider>(
    'HashProvider',HashProvider
)


container.registerInstance<ISendForgotPasswordMail>(
    'MailProvider',new EtherealMailProvider()
)
