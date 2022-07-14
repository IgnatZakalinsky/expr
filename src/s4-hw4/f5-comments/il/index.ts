import {Router} from 'express'
import {CommentsIL} from './commentsIL'
import {userAuthMiddleware} from '../../f3-auth/il/middlewares'
import {commentValidationsMiddleware} from './middlewares'

export const commentsRouter = Router()

commentsRouter.get('/:id', CommentsIL.getById)
commentsRouter.put('/:id', commentValidationsMiddleware, userAuthMiddleware, CommentsIL.update)
commentsRouter.delete('/:id', userAuthMiddleware, CommentsIL.del)