import {Router} from 'express'

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth'
import ProfileController from '@modules/users/infra/http/controllers/profileController'

const profileController = new ProfileController()

const profileRouter = Router()

profileRouter.use(ensureAuth)
profileRouter.put('/',profileController.update)
profileRouter.get('/',profileController.show)


export default profileRouter