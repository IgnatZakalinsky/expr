import {Router} from 'express'
import {AuthIL} from './authIL'
import {loginValidationsMiddleware} from './middlewares'
import {validationsErrorsMiddleware} from '../../../s3-hw3/globalMiddlewares'

export const authRouter = Router()

authRouter.post('/login', loginValidationsMiddleware, validationsErrorsMiddleware, AuthIL.login)