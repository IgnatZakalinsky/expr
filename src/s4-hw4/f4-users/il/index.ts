import {Router} from 'express'
import {UsersIL} from './usersIL'
import {loginValidationsMiddleware} from '../../f3-auth/il/middlewares'
import {authMiddleware, validationsErrorsMiddleware} from '../../../s3-hw3/globalMiddlewares'

export const usersRouter = Router()

usersRouter.post('/', authMiddleware, loginValidationsMiddleware, validationsErrorsMiddleware, UsersIL.add)