import { Router } from 'express'

import ForgotPasswordController from '@modules/users/infra/http/controllers/forgotPasswordController'
import ResetPasswordController from '@modules/users/infra/http/controllers/resetPasswordController'

const resetPasswordController = new ResetPasswordController()
const forgotPasswordController = new ForgotPasswordController()

const passwordRouter = Router()
passwordRouter.post('/forgot',forgotPasswordController.create)
passwordRouter.post('/reset',resetPasswordController.create)

export default passwordRouter