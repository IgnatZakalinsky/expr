import {Router} from 'express'
import {CommentsIL} from './commentsIL'
import {userAuthMiddleware} from '../../f3-auth/il/middlewares'
import {commentValidationsMiddleware} from './middlewares'
import {validationsErrorsMiddleware} from '../../../s3-hw3/globalMiddlewares'

export const commentsRouter = Router()

commentsRouter.get('/:id', CommentsIL.getById)
commentsRouter.put(
    '/:id',
    userAuthMiddleware,
    commentValidationsMiddleware,
    validationsErrorsMiddleware,
    CommentsIL.update
)
commentsRouter.delete('/:id', userAuthMiddleware, CommentsIL.del)