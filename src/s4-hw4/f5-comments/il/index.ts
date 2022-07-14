import {Router} from 'express'
import {CommentsIL} from './commentsIL'
import {userAuthMiddleware} from '../../f3-auth/il/middlewares'

export const commentsRouter = Router()

commentsRouter.get('/:id', CommentsIL.getById)
commentsRouter.put('/:id', userAuthMiddleware, CommentsIL.update)
commentsRouter.delete('/:id', userAuthMiddleware, CommentsIL.del)