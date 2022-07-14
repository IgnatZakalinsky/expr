import {Router} from 'express'
import {AuthIL} from './authIL'
import {validationsErrorsMiddleware, validationsLoginErrorsMiddleware} from '../../../s3-hw3/globalMiddlewares'

export const authRouter = Router()

authRouter.post('/login', validationsLoginErrorsMiddleware, validationsErrorsMiddleware, AuthIL.login)