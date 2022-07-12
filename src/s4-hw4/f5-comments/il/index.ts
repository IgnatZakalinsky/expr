import {Router} from 'express'
import {loginValidationsMiddleware} from '../../f3-auth/il/middlewares'
import {authMiddleware, validationsErrorsMiddleware} from '../../../s3-hw3/globalMiddlewares'

export const commentsRouter = Router()

// commentsRouter.put('/:id', authMiddleware, loginValidationsMiddleware, validationsErrorsMiddleware, UsersIL.add)
// usersRouter.get('/', UsersIL.read)
// usersRouter.delete('/:id?', authMiddleware, UsersIL.del)