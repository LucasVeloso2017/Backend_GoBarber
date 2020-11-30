import {Router} from 'express'
import multer from 'multer'

import { celebrate,Segments,Joi } from 'celebrate'

import uploadConfig from '@config/upload'

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth'
import UsersController from '@modules/users/infra/http/controllers/usersController'

const usersController = new UsersController()

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.patch('/avatar',ensureAuth,upload.single('avatar'),usersController.store)
usersRouter.post('/',celebrate({
    [Segments.BODY]:{
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required()
    }
})
,usersController.create)

export default usersRouter