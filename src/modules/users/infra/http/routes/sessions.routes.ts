import {Router } from 'express'
const sessionsRouter = Router()

import SessionController from '@modules/users/infra/controllers/sessionController'

const sessionController = new SessionController()
sessionsRouter.post('/',sessionController.create)

export default sessionsRouter