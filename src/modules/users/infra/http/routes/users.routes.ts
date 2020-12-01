import {Router} from 'express'
import multer from 'multer'

import { celebrate,Segments,Joi } from 'celebrate'

import uploadConfig from '@config/upload'

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth'
import UsersController from '@modules/users/infra/http/controllers/usersController'
import UserAvatarController from '@modules/users/infra/http/controllers/userAvatarController'
import UserAdminController from '@modules/users/infra/http/controllers/usersAdminController'


const usersController = new UsersController()
const userAvatarController = new UserAvatarController()
const userAdminController = new UserAdminController()

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.patch('/avatar',ensureAuth,upload.single('avatar'),userAvatarController.update)
usersRouter.post('/',celebrate({
    [Segments.BODY]:{
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required()
    }
})
,usersController.create)

usersRouter.post('/admin',userAdminController.create)

export default usersRouter