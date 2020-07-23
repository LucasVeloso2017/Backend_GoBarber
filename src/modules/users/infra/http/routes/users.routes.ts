import {Router} from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth'
import UsersController from '@modules/users/infra/controllers/usersController'

const usersController = new UsersController()

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.patch('/avatar',ensureAuth,upload.single('avatar'),usersController.store)
usersRouter.post('/',usersController.create)

export default usersRouter