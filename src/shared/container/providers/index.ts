import IStorageProvider from '@shared/container/providers/storageProviders/models/IStorageProvider'
import DiskStorageProvider from '@shared/container/providers/storageProviders/implementations/DiskStorageProvider'
import {container} from 'tsyringe'

container.registerSingleton<IStorageProvider>('StorageProvider',DiskStorageProvider)
